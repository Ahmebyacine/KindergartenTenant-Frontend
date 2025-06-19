import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SearchNormal1, Document } from "iconsax-react";
import { Link } from "react-router-dom";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import ExpensesModal from "./ExpensesModal";
import ExpensesFilter from "./ExpensesFilter";

export default function ExpensesTable({ expenses }) {

  const expenseTypes = [
  { label: "رواتب", value: "salaries" },
  { label: "أدوات", value: "supplies" },
  { label: "صيانة", value: "maintenance" },
  { label: "خدمات", value: "utilities" },
  { label: "أخرى", value: "other" },
];

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
              disabled={!expenses.length}
            />
          </div>
          <ExpensesFilter expenseTypes={expenseTypes} />
        </div>
        <ExpensesModal expenseTypes={expenseTypes} />
      </div>
      <Card className="border border-border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
              <TableHead className="text-foreground font-medium">
                #
              </TableHead>
              <TableHead className="text-foreground font-medium">
                الوصف
              </TableHead>
              <TableHead className="text-foreground font-medium">
                التاريخ
              </TableHead>
              <TableHead className="text-foreground font-medium">
                التصنيف
              </TableHead>
              <TableHead className="text-foreground font-medium">
                المبلغ
              </TableHead>
              <TableHead className="text-foreground font-medium">
                طريقة الدفع
              </TableHead>
              <TableHead className="text-foreground font-medium">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          {expenses.length > 0 ? (
            <TableBody>
              {expenses.map((row, index) => (
                <TableRow
                  key={index}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell className="text-foreground py-3">
                    {row.quantity}
                  </TableCell>
                  <TableCell className="text-foreground font-medium py-3">
                    {row.description}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {row.category}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {formatCurrencyDZD(row.amount)}
                  </TableCell>
                  <TableCell className="py-3">
                    {row.payment_method}
                  </TableCell>
                  <TableCell className="py-3">
                    <Button
                      variant="link"
                      className="text-primary hover:text-primary/80 p-0 h-auto underline"
                    >
                      <Link to={`/reports/health/${row.details}`}>
                        عرض التفاصيل
                      </Link>
                    </Button>
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
