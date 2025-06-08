import { ReactNode } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { SearchDef } from "@/lib/table/capybara-column-def"
import { cn } from "@/lib/utils"

export function DataTableSearchForm({ searchs, onSearchFunc, onClearFunc }:
  {
    searchs: SearchDef[],
    onSearchFunc: (data: object) => void,
    onClearFunc: (data: object) => void,
  }) {
  const form = useForm({})
  function onSearch(data: object) {
    onSearchFunc(data)
  }
  function onClear() {
    form.reset()
    onClearFunc({})
  }
  const formFields: ReactNode[] = searchs.map((search) => {
    if (search.dataType === 'string') {
      return (
        <FormField key={search.id}
          control={form.control}
          name={search.id}
          render={({ field }) => (
            <FormItem>
              <Input {...field}
                placeholder={`${search.placeholder}...`}
                value={field.value ?? ""}
                className="max-w-sm mr-4"
              />
            </FormItem>
          )}
        />
      )
    }
    if (search.dataType === 'number') {
      return (
        <FormField key={search.id}
          control={form.control}
          name={search.id}
          render={({ field }) => (
            <FormItem>
              <Input {...field}
                placeholder={`${search.placeholder}`}
                value={field.value ?? ""}
                className="max-w-sm mr-4"
              />
            </FormItem>
          )}
        />
      )
    }
    if (search.dataType === 'select') {
      return (
        <FormField key={search.id}
          control={form.control}
          name={search.id}
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={search.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {search.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      )
    }
    if (search.dataType === 'date') {
      return (
        <FormField key={search.id}
          control={form.control}
          name={search.id}
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{`${search.placeholder}...`}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      )
    }
    return null
  })
  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-3 w-full">
      {formFields}
      <Button type="submit" className="w-20 space-y-2">Search</Button>
      <Button type="reset" className="w-20 space-y-2" onClick={(onClear)}>Clear</Button>
    </form>
  </Form>
}