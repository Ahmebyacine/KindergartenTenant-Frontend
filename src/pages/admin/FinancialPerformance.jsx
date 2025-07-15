import {
  CardReceive,
  CardSend,
  Chart2,
  DollarSquare,
  SearchNormal1,
} from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Input } from "@/components/ui/input";
import IncomesFilter from "@/layouts/admin/incomes/IncomesFilter";
import FinancialJournalChart from "@/layouts/admin/financialPerformance/FinancialJournalChart";
import FinancialJournalTable from "@/layouts/admin/financialPerformance/FInancialJournalTable";
import EmployeeJournalTable from "@/layouts/admin/financialPerformance/EmployeeJournalTable";
import StatCard from "@/components/StatCard";
import api from "@/services/api";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import useFetch from "@/hooks/useFetch";

export default function FinancialPerformance() {
  const fetchFinancialPerformance = async () => {
    const res = await api.get(`/statistics/financial-performance`);
    return res.data.map((item) => ({
      ...item,
      monthLabel: getMonthNameByNumber(item.month),
    }));
  };
  const { data, loading } = useFetch(fetchFinancialPerformance);

  const totals = data.reduce(
    (acc, item) => {
      acc.expenses += item.expenses;
      acc.income += item.income;
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const employeeData = [
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
  ];

  const profit = totals?.income - totals?.expenses || 0;
  const profitPercentage =
    totals?.income > 0
      ? ((profit / totals.income) * 100).toFixed(2) + "%"
      : "0%";

  const statsData = [
    {
      title: "إجمالي المداخيل",
      value: formatCurrencyDZD(totals?.income || 0),
      subLabel: "المبلغ المحصل خلال السنة الحالية",
      icon: CardReceive,
      bgColor: "bg-[#DCFCE7]",
      iconColor: "#00A63E",
    },
    {
      title: "إجمالي المصاريف",
      value: formatCurrencyDZD(totals?.expenses || 0),
      icon: CardSend,
      bgColor: "bg-[#FFE2E2]",
      iconColor: "#FB2C36",
      subLabel: "جميع المصاريف المسجلة",
    },
    {
      title: "صافي الربح",
      value: formatCurrencyDZD(profit),
      icon: DollarSquare,
      bgColor: "bg-[#FEF3C6]",
      iconColor: "#D08700",
      subLabel: "الفرق بين المداخيل والمصاريف",
    },
    {
      title: "نسبة الربح",
      value: profitPercentage,
      icon: Chart2,
      bgColor: "bg-[#DBEAFE]",
      iconColor: "#1447E6",
      subLabel: "مقارنة بين الربح والمصاريف الإجمالية",
    },
  ];

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array(4)
                .fill(null)
                .map((_, idx) => <StatCard key={idx} loading={loading} />)
            : statsData.map((stat, idx) => <StatCard key={idx} stat={stat} />)}
        </div>
        {/* filter search and tables */}
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
                //disabled={!expenses.length}
              />
            </div>
            <IncomesFilter />
          </div>
        </div>
        <FinancialJournalChart data={data} loading={loading} />
        <FinancialJournalTable data={data} loading={loading} />
        <EmployeeJournalTable data={employeeData} />
      </div>
    </div>
  );
}
