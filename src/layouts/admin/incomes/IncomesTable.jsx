import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Document } from "iconsax-react";
import LoadingTable from "@/components/LoadingTable";
import { t } from "i18next";
import { useCurrency } from "@/hooks/useCurrency";

export default function IncomesTable({ incomes, loading }) {
  const { format } = useCurrency();
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-medium">{t("income.month")}</TableHead>
            <TableHead className="text-foreground font-medium">
              {t("income.yearAcademy")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("income.numberOfFaturations")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("income.totalAmount")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("income.averageInvoice")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("income.collectionRate")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("income.previousMonthComparison")}
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableBody>
            <LoadingTable />
          </TableBody>
        ) : incomes.length > 0 ? (
          <TableBody>
            {incomes.map((row, index) => (
              <TableRow
                key={index}
                className="border-b border-border hover:bg-muted/50"
              >
                <TableCell className="text-foreground py-3">
                  {row?.monthLabel}
                </TableCell>
                <TableCell className="text-foreground font-medium py-3">
                  {row?.year}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {row?.totalInvoices}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {format(row?.totalAmount)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {format(row?.averageInvoice)}
                </TableCell>
                <TableCell className="py-3">{row?.collectionRate}</TableCell>
                <TableCell className="py-3">
                  %{row?.compareToPrevious || "N/A"}
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
                  <p className="text-lg font-medium">{t("income.noDataTitle")}</p>
                  <p className="text-sm">
                    {t("income.noDataDesc")}
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
