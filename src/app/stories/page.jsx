import CustomTable from '@/components/CustomTable'
import React from 'react'

function page() {
  const columns = [
    { id: "name", name: "Name" },
    { id: "role", name: "Role" },
    { id: "status", name: "Status" },
    { id: "email", name: "Email" },
    { id: "isBookmark", name: "Bookmark" },
  ];
  const users = [
    { email: "kate@acme.com", id: 1, name: "Kate Moore", role: "CEO", status: "Active", isBookmark: true },
    { email: "john@acme.com", id: 2, name: "John Smith", role: "CTO", status: "Active", isBookmark: false },
    { email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave", isBookmark: false },
    { email: "michael@acme.com", id: 4, name: "Michael Brown", role: "CFO", status: "Active", isBookmark: false },
    {
      email: "emily@acme.com",
      id: 5,
      name: "Emily Davis",
      role: "Product Manager",
      status: "Inactive",
      isBookmark: false,
    },
    { email: "davis@acme.com", id: 6, name: "Davis Wilson", role: "Lead Designer", status: "Active", isBookmark: false },
    {
      email: "olivia@acme.com",
      id: 7,
      name: "Olivia Martinez",
      role: "Frontend Engineer",
      status: "Active",
      isBookmark: false,
    },
    {
      email: "james@acme.com",
      id: 8,
      name: "James Taylor",
      role: "Backend Engineer",
      status: "Active",
      isBookmark: false,
    },
  ];
  return (
    <div>

      <CustomTable columns={columns} rows={users} />
    </div>
  )
}

export default page