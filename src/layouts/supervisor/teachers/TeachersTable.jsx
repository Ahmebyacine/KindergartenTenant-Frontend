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
import { t } from "i18next";

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
              {t("teachers.name")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("teachers.assignedClass")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("teachers.phone")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("teachers.email")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("teachers.dateOfHiring")}
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
                  {teacher?.assignedClass?.className || t("teachers.noAssigned")}
                </TableCell>
                <TableCell dir="ltr" className="text-foreground py-3">
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
                  <p className="text-lg font-medium">{t("teachers.noTeachers")}</p>
                  <p className="text-sm">
                    {t("teachers.noTeachersDescription")}
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
