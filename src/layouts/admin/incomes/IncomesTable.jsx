import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Document } from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import LoadingTable from "@/components/LoadingTable";

export default function IncomesTable({ incomes, loading }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-medium">الشهر</TableHead>
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
                  {formatCurrencyDZD(row?.totalAmount)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {formatCurrencyDZD(row?.averageInvoice)}
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
    </>
  );
}
