import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getClassStatusBadge } from "@/utils/getStatusBadges";
import { FileTextIcon } from "lucide-react";
import LoadingTable from "@/components/LoadingTable";

export default function ClassesTable({ classes, loading }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-muted-foreground font-medium h-12">
              #
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              اسم الفصل
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              المعلمة
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              عدد الطلاب
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              حالة الفصل
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <LoadingTable />
          ) : classes.length > 0 ? (
            // Actual data rows
            classes.map((classItem, i) => (
              <TableRow
                key={classItem._id}
                className="border-b border-border hover:bg-muted/50"
              >
                <TableCell className="text-foreground py-3">{i + 1}</TableCell>
                <TableCell className="text-foreground font-medium py-3">
                  {classItem.className}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {classItem?.teacher?.name}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {classItem.studentCount}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {getClassStatusBadge(classItem.studentsCount)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            // No data message
            <TableRow>
              <TableCell
                colSpan={6} // Changed from 8 to 6 to match the number of TableHead columns
                className="text-center py-12 text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <FileTextIcon size={40} color="CurrentColor" />{" "}
                  <p className="text-lg font-medium">لا توجد اقسام متاحة</p>
                  <p className="text-sm">لم يتم إنشاء أي اقسام بعد</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
