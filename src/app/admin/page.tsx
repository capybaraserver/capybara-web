'use client'
import { DataTable } from "@/components/ui/data-table"
import { columns, Payment } from "./columns"
import { toast } from "sonner"

const data: Payment[] =
  [
    {
      id: "728ed521",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed522",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed523",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed524",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed525",
      amount: 100,
      status: "pending",
      email: "j@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed526",
      amount: 100,
      status: "processing",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed527",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed528",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed529",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed5210",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed5211",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed521",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed522",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed523",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed524",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed525",
      amount: 100,
      status: "pending",
      email: "j@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed526",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed527",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed528",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed529",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed5210",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
    {
      id: "728ed5211",
      amount: 90,
      status: "pending",
      email: "m@example.com",
      date: "2024-06-06"
    },
  ]

export default function page() {
  function onSearchFunc(data: object) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  function onClearFunc(data: object) {
    toast("You clear the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <div>
      <DataTable columns={columns} data={data}
        onSearchFunc={onSearchFunc} onClearFunc={onClearFunc} />
    </div>
  )
}
