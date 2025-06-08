import {
  ColumnDef,
} from "@tanstack/react-table"

export type SelectOption = {
  value: any,
  label: string
}

export type SearchDef = {
  dataType?: "string" | "number" | "date" | "dateTime" | "select",
  id: string,
  placeholder?: string
  options?: SelectOption[]
}

export type CapybaraColumnDef<TData> = ColumnDef<TData> & { search?: SearchDef }