import { TableRow, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingTable({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow
          key={`skeleton-${index}`}
          className="border-b border-border hover:bg-muted/50"
        >
          <TableCell className="py-3">
            <Skeleton className="h-4 w-8" />
          </TableCell>
          <TableCell className="py-3">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="py-3">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="py-3">
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell className="py-3">
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell className="py-3">
            <Skeleton className="h-4 w-16" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}