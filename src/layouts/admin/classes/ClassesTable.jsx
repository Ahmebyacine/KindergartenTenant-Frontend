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
import ClassesModal from "./ClassesModal";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { t } from "i18next";
import { useCurrency } from "@/hooks/useCurrency";

export default function ClassesTable({
  classes,
  loading,
  categories,
  onUpdateClass,
  onDeleteClass,
}) {
  const { format } = useCurrency();
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
          <TableHead className="text-muted-foreground font-medium h-12 !text-center">
            #
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            {t("classes.nameLabel")}
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            {t("classes.studentCountLabel")}
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            {t("classes.priceLabel")}
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            {t("classes.statusLabel")}
          </TableHead>
          <TableHead className="text-muted-foreground font-medium">
            {t("classes.actionsLabel")}
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
              <TableCell className="text-foreground py-3 !text-center">{i + 1}</TableCell>
              <TableCell className="text-foreground font-medium py-3">
                {classItem.className}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {classItem.studentCount}
              </TableCell>
              <TableCell className="text-foreground py-3">
                { classItem.price ? format(classItem.price) : "-"}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {getClassStatusBadge(
                  classItem.studentCount,
                  classItem.capacity
                )}
              </TableCell>
              <TableCell className="py-3 flex">
                <ClassesModal
                  editingClass={classItem}
                  categories={categories}
                  onUpdateClass={onUpdateClass}
                />
                <DeleteAlertDialog
                  title={t("classes.deleteTitle")}
                  item={classItem._id}
                  onDelete={onDeleteClass}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          // No data message
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-12 text-muted-foreground"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <FileTextIcon size={40} color="CurrentColor" />
                <p className="text-lg font-medium">{t("classes.noClasses")}</p>
                <p className="text-sm">
                  {t("classes.noClassesDescription")}
                </p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
