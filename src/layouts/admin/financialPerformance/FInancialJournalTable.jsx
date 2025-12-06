import LoadingTable from "@/components/LoadingTable";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrency } from "@/hooks/useCurrency";
import { t } from "i18next";
import { Document } from "iconsax-react";
import React from "react";

export default function FinancialJournalTable({ data, loading }) {
  const { format } = useCurrency();
  return (
    <Card className="shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-medium !text-center">
              {t("financialPerformance.month")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.year")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.income")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.expenses")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.profit")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.profitMargin")}
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableBody>
            <LoadingTable />
          </TableBody>
        ) : data.length > 0 ? (
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className="border-b border-border hover:bg-muted/50"
              >
                <TableCell className="text-foreground py-3 !text-center">
                  {row?.monthLabel}
                </TableCell>
                <TableCell className="text-foreground font-medium py-3">
                  {row?.year}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {format(row?.income)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {format(row?.expenses)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {format(row?.income - row?.expenses)}
                </TableCell>
                <TableCell className="py-3">
                  {row?.income && row?.income !== 0
                    ? ((row.expenses / row.income) * 100).toFixed(2) + "%"
                    : "N/A"}
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
                  <p className="text-lg font-medium">{t("financialPerformance.noReports")}</p>
                  <p className="text-sm">
                    {t("financialPerformance.noReportsDescription")}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </Card>
  );
}
