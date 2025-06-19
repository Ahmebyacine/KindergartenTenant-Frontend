import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Document } from "iconsax-react";
import { formatDate } from "@/utils/dateFormatter";
import i18next from "i18next";
import LoadingTable from "@/components/LoadingTable";

export default function AttendanceTable({ loading, attendance }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
          <TableHead className="text-right text-muted-foreground font-medium h-12">
            #
          </TableHead>
          <TableHead className="text-right text-muted-foreground font-medium">
            اسم الطفل
          </TableHead>
          <TableHead className="text-right text-muted-foreground font-medium">
            الفصل
          </TableHead>
          <TableHead className="text-right text-muted-foreground font-medium">
            الحالة
          </TableHead>
          <TableHead className="text-right text-muted-foreground font-medium">
            توقيت الدخول
          </TableHead>
          <TableHead className="text-right text-muted-foreground font-medium">
            توقيت الخروج
          </TableHead>
          <TableHead className="text-right text-muted-foreground font-medium">
            الملاحظات
          </TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <LoadingTable />
      ) : attendance?.length > 0 ? (
        <TableBody>
          {attendance?.map((teacher, i) => (
            <TableRow
              key={teacher._id}
              className="border-b border-border hover:bg-muted/50"
            >
              <TableCell className="text-foreground py-3">{i + 1}</TableCell>
              <TableCell className="text-foreground font-medium py-3">
                {teacher.name}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {teacher.assignedClass.className}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {teacher.phone}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {teacher.email}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {formatDate(teacher.createdAt, i18next.language)}
              </TableCell>
              <TableCell className="py-3">
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80 p-0 h-auto underline"
                >
                  {teacher.actions}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={8}
              className="text-center py-12 text-muted-foreground"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Document size={40} color="CurrentColor" />
                <p className="text-lg font-medium">
                  لا توجد بيانات الحضور والغياب متاحة
                </p>
                <p className="text-sm">
                  لم يتم إنشاء أي بيانات الحضور والغياب بعد
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
