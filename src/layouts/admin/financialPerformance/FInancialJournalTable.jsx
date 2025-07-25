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
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Document } from "iconsax-react";
import React from "react";

export default function FinancialJournalTable({ data, loading }) {
  return (
    <Card className="shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-medium !text-center">
              الشهر
            </TableHead>
            <TableHead className="text-foreground font-medium">السنة</TableHead>
            <TableHead className="text-foreground font-medium">
              المداخيل
            </TableHead>
            <TableHead className="text-foreground font-medium">
              المصاريف
            </TableHead>
            <TableHead className="text-foreground font-medium">
              الفارق
            </TableHead>
            <TableHead className="text-foreground font-medium">
              نسبة الربح
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
                  {formatCurrencyDZD(row?.income)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {formatCurrencyDZD(row?.expenses)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {formatCurrencyDZD(row?.income - row?.expenses)}
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
                  <p className="text-lg font-medium">لا توجد تقارير متاحة</p>
                  <p className="text-sm">
                    لم يتم إنشاء أي تقارير بعد، قم بإضافة تقرير جديد
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
