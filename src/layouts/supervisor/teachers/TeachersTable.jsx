import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRemove } from "iconsax-react";
import { formatDate } from "@/utils/dateFormatter";
import LoadingTable from "@/components/LoadingTable";

export default function TeachersTable({ loading, teachers }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-muted-foreground font-medium h-12 !text-center">
              #
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              اسم المعلمة
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              القسم
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              رقم الهاتف
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              البريد الالكتروني
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              تاريخ التعيين
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <LoadingTable />
        ) : teachers.length > 0 ? (
          <TableBody>
            {teachers.map((teacher, i) => (
              <TableRow
                key={teacher._id}
                className="border-b border-border hover:bg-muted/50"
              >
                <TableCell className="text-foreground py-3 !text-center">{i + 1}</TableCell>
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
                  {formatDate(teacher.createdAt)}
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
                  <UserRemove size={40} color="CurrentColor" />
                  <p className="text-lg font-medium">لا توجد اساتذة متاحين</p>
                  <p className="text-sm">
                    لم يتم إضافة أي معلمين بعد 
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </>
  );
}
