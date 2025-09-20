import type { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [8, 16, 24, 32, 40, 48, 56],
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        className
      )}
      {...props}
    >
      {/* <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          {/* <Button
            aria-label="Go to first page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table?.setPageIndex(0)}
            disabled={!table?.getCanPreviousPage()}
          >
            <ChevronsLeft className="text-neutral-900" />
          </Button> */}
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            onClick={() => table?.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="text-neutral-900" />
          </Button>
          <div className="flex items-center justify-center font-medium text-xs text-neutral-700">
            {(() => {
              const currentPage = table?.getState()?.pagination?.pageIndex + 1
              const totalPages = table?.getPageCount()

              if (!currentPage || !totalPages) return null

              const getPageNumbers = () => {
                if (totalPages <= 7) {
                  // Show all pages if 7 or fewer
                  return Array.from({ length: totalPages }, (_, i) => i + 1)
                }

                const pages: (number | string)[] = []

                if (currentPage <= 4) {
                  // Show first 5 pages, ellipsis, last page
                  pages.push(1, 2, 3, 4, 5, "...", totalPages)
                } else if (currentPage >= totalPages - 3) {
                  // Show first page, ellipsis, last 5 pages
                  pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
                } else {
                  // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
                  pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
                }

                return pages
              }

              return getPageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <span key={`ellipsis-${index}`} className="mx-1 px-2 py-1 text-neutral-700 cursor-default">
                      ...
                    </span>
                  )
                }

                const pageNumber = page as number
                const isCurrentPage = pageNumber === currentPage

                return (
                  <button
                    key={pageNumber}
                    className={cn(
                      "mx-1 px-2 py-1 rounded cursor-pointer transition-colors hover:bg-neutral-100",
                      isCurrentPage ? "text-black font-semibold" : "text-neutral-700 hover:text-black"
                    )}
                    onClick={() => table?.setPageIndex(pageNumber - 1)}
                  >
                    {pageNumber}
                  </button>
                )
              })
            })()}
          </div>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8 rounded-full"
            onClick={() => table?.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="text-neutral-900" />
          </Button>
          {/* <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table?.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="text-neutral-900" />
          </Button> */}
        </div>

        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap font-normal text-xs text-neutral-700">Show Rows:</p>
          <Select
            value={`${table?.getState()?.pagination.pageSize}`}
            onValueChange={(value) => {
              table?.setPageIndex?.(Number(0))
              table?.setPageSize?.(Number(value))
            }}
          >
            <SelectTrigger className="h-8 [&[data-size]]:h-8 rounded-full text-black-900 text-xs border  border-neutral-600 shadow-none gap-1 justify-start">
              <SelectValue placeholder={table?.getState?.()?.pagination?.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions?.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
