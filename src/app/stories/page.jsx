"use client";

import CustomTable from "@/components/CustomTable";
import { TableProvider } from "@/context/TableContext";
import { TableHeader } from "@/data/TableHeader";
import { fetchStories, toggleBookmark, deleteStory } from "@/services/apiService";

export default function Page() {
  return (
    // ✅ just swap fetchFn/bookmarkFn/deleteFn for any other module
    <TableProvider
      fetchFn={fetchStories}
      bookmarkFn={toggleBookmark}
      // deleteFn={deleteStory}
    >
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Stories</h1>
        <CustomTable columns={TableHeader} />
      </div>
    </TableProvider>
  );
}