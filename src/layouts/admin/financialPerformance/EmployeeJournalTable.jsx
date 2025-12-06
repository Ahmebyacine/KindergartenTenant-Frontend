import { useState } from "react";
import LoadingTable from "@/components/LoadingTable";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import api from "@/api";
import { formatDateMonth } from "@/utils/dateFormatter";
import { Document } from "iconsax-react";
import { Input } from "@/components/ui/input";
import { t } from "i18next";
import { useCurrency } from "@/hooks/useCurrency";

export default function EmployeeJournalTable() {
  const { format } = useCurrency();
  const [monthFilter, setMonthFilter] = useState(new Date().toISOString().slice(0, 7));
  const fetchFinancialPerformance = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.month) params.append("month", filters.month);
    const res = await api.get(
      `/financial-reports/statistics-users?${params.toString()}`
    );
    return res.data;
  };
  const { data, loading, refetch } = useFetch(fetchFinancialPerformance);
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>{t("financialPerformance.title")}</CardTitle>
        <CardAction>
          <Input
            type="month"
            value={monthFilter}
            onChange={(e) => {
              const value = e.target.value;
              setMonthFilter(value);
              refetch(() => fetchFinancialPerformance({ month: value }));
            }}
            placeholder={t("financialPerformance.selectMonth")}
          />
        </CardAction>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.employee")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("common.date")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.operationsCount")}
            </TableHead>
            <TableHead className="text-foreground font-medium">
              {t("financialPerformance.totalAmount")}
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableBody>
            <LoadingTable />
          </TableBody>
        ) : data?.result?.length > 0 ? (
          <TableBody>
            {data?.result?.map((row, index) => (
              <TableRow
                key={index}
                className="border-b border-border hover:bg-muted/50"
              >
                <TableCell className="text-foreground py-3">
                  {row?.name}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {formatDateMonth(data?.date)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {row?.count}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {format(row?.totalAmount)}
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
                  <p className="text-lg font-medium">
                    {t("financialPerformance.noReports")}
                  </p>
                  <p className="text-sm">
                    {t("financialPerformance.noReportsDesc")}
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
