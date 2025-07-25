import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Document } from "iconsax-react";
import { formatDateTime } from "@/utils/dateFormatter";
import LoadingTable from "@/components/LoadingTable";
import { getAttendancesBadge } from "@/utils/getStatusBadges";

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
        <TableBody>
          <LoadingTable />
        </TableBody>
      ) : attendance?.length > 0 ? (
        <TableBody>
          {attendance?.map((att, i) => (
            <TableRow
              key={att._id}
              className="border-b border-border hover:bg-muted/50"
            >
              <TableCell className="text-foreground py-3">{i + 1}</TableCell>
              <TableCell className="text-foreground font-medium py-3">
                {att?.student?.name}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {att?.class?.name}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {getAttendancesBadge(att?.status)}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {att?.checkInTime ? formatDateTime(att?.checkInTime) : "--"}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {att?.checkOutTime ? formatDateTime(att?.checkOutTime) : "--"}
              </TableCell>
              <TableCell className="py-3">
                {att?.notes || "لا توجد ملاحظات"}
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
