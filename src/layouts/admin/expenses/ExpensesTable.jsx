import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoneySend } from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import LoadingTable from "@/components/LoadingTable";
import i18n from "@/i18n";
import { formatDateTime } from "@/utils/dateFormatter";
import ExpensesModal from "./ExpensesModal";

export default function ExpensesTable({ expenses, loading, handleUpdateExpenses }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
          <TableHead className="text-foreground font-medium">#</TableHead>
          <TableHead className="text-foreground font-medium">الوصف</TableHead>
          <TableHead className="text-foreground font-medium">التاريخ</TableHead>
          <TableHead className="text-foreground font-medium">التصنيف</TableHead>
          <TableHead className="text-foreground font-medium">المبلغ</TableHead>
          <TableHead className="text-foreground font-medium">
            محرر العملية
          </TableHead>
          <TableHead className="text-foreground font-medium">
            الإجراءات
          </TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <TableBody>
          <LoadingTable />
        </TableBody>
      ) : expenses?.length > 0 ? (
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
              <TableCell className="text-foreground py-3">{formatDateTime(row.createdAt,i18n.language)}</TableCell>
              <TableCell className="text-foreground py-3">
                {row.category}
              </TableCell>
              <TableCell className="text-foreground py-3">
                {formatCurrencyDZD(row.amount,i18n.language)}
              </TableCell>
              <TableCell className="py-3">{row?.approvedBy?.name}</TableCell>
              <TableCell className="py-3">
                <ExpensesModal editingExpense={row} onUpdateExpense={handleUpdateExpenses} />
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
                <MoneySend size={40} color="CurrentColor" />
                <p className="text-lg font-medium">لا توجد مصريف  متاحة</p>
                <p className="text-sm">
                  لم يتم إنشاء أي مصريف  بعد، قم بإضافة مصروف جديد
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
