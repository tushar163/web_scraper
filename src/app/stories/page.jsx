"use client";
import CustomTable from '@/components/CustomTable'
import { TableHeader } from '@/data/TableHeader';
import { fetchStories } from '@/services/apiService';
import { toast } from '@heroui/react';
import React, { useEffect, useState } from 'react'

function page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStories();
        if (response.success) {
          toast.success("Stories fetched successfully");
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        toast.danger("Failed to fetch stories: " + (error.message || "Unknown error"));
      }
    };
    fetchData();
  }, []);
  console.log("Fetched stories:", data);
  return (
    <div>

      <CustomTable columns={TableHeader} rows={data} />
    </div>
  )
}

export default page