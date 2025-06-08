"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { CapybaraColumnDef } from "@/lib/table/capybara-column-def"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  date?: string
}

export const columns: CapybaraColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    search: {
      id: "status",
      dataType: "select",
      placeholder: 'Fiter status...',
      options: [{
        label: "pending",
        value: "pending"
      }, {
        label: "processing",
        value: "processing"
      }, {
        label: "success",
        value: "success"
      }, {
        label: "failed",
        value: "failed"
      }]
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />
    },
    enableColumnFilter: true,
    search: {
      id: "email",
      dataType: "string",
      placeholder: 'Fiter emails...'
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-left font-medium">{formatted}</div>
    },
    search: {
      id: "amount",
      dataType: "string",
      placeholder: 'Fiter amount...'
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    search: {
      id: "date",
      dataType: "date",
      placeholder: 'Fiter date...'
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]