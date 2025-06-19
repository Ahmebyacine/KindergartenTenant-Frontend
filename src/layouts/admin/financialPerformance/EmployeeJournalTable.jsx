import { Card, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import i18n from "@/i18n";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import React from "react";

export default function EmployeeJournalTable({ data }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-foreground">
          تفاصيل المداخيل التنفيذية حسب الموظف
        </h3>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-medium">الموظف</TableHead>
            <TableHead className="text-foreground font-medium">
              السنة الدراسية
            </TableHead>
            <TableHead className="text-foreground font-medium">
              الشهر
            </TableHead>
            <TableHead className="text-foreground font-medium">
              عدد العمليات
            </TableHead>
            <TableHead className="text-foreground font-medium">
              مجموع المبالغ
            </TableHead>
            <TableHead className="text-foreground font-medium">
              ملاحظات
            </TableHead>
          </TableRow>
        </TableHeader>
        {data.length > 0 ? (
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className="border-b border-border hover:bg-muted/50"
              >
                <TableCell className="text-foreground py-3">
                  {row.employee}
                </TableCell>
                <TableCell className="text-foreground font-medium py-3">
                  {row.year}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {row.month}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {row.operations}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {formatCurrencyDZD(row.amount, i18n.language)}
                </TableCell>
                <TableCell className="py-3">{row.notes}</TableCell>
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
