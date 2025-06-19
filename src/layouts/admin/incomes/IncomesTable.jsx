import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SearchNormal1, Document } from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import IncomesFilter from "./IncomesFilter";
import i18n from "@/i18n";

export default function IncomesTable({ incomes }) {

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <SearchNormal1
              size="16"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              color="currentColor"
            />
            <Input
              placeholder="البحث"
              className="pr-10 pl-4 py-2 bg-background"
              disabled={!incomes.length}
            />
          </div>
          <IncomesFilter />
        </div>
      </div>
      <Card className="border border-border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
              <TableHead className="text-foreground font-medium">
                الشهر
              </TableHead>
              <TableHead className="text-foreground font-medium">
                السنة الدراسية
              </TableHead>
              <TableHead className="text-foreground font-medium">
                عدد الفواتير
              </TableHead>
              <TableHead className="text-foreground font-medium">
                المبلغ الإجمالي
              </TableHead>
              <TableHead className="text-foreground font-medium">
                معدل الفاتورة
              </TableHead>
              <TableHead className="text-foreground font-medium">
                نسبة التحصيل
              </TableHead>
              <TableHead className="text-foreground font-medium">
                مقارنة الشهر السابق
              </TableHead>
            </TableRow>
          </TableHeader>
          {incomes.length > 0 ? (
            <TableBody>
              {incomes.map((row, index) => (
                <TableRow
                  key={index}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell className="text-foreground py-3">
                    {row.month}
                  </TableCell>
                  <TableCell className="text-foreground font-medium py-3">
                    {row.schoolYear}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {row.invoiceCount}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {formatCurrencyDZD(row.totalAmount,i18n.language)}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {formatCurrencyDZD(row.averageInvoice,i18n.language)}
                  </TableCell>
                  <TableCell className="py-3">
                    {row.collectionRate}
                  </TableCell>
                  <TableCell className="py-3">
                    {row.monthlyComparison}
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
    </>
  );
}