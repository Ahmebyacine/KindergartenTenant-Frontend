import {
  CardReceive,
  CardSend,
  Chart2,
  DollarSquare,
} from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import FinancialJournalChart from "@/layouts/admin/financialPerformance/FinancialJournalChart";
import FinancialJournalTable from "@/layouts/admin/financialPerformance/FInancialJournalTable";
import EmployeeJournalTable from "@/layouts/admin/financialPerformance/EmployeeJournalTable";
import StatCard from "@/components/StatCard";
import api from "@/api";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";
import { t } from "i18next";

export default function FinancialPerformance() {
  const fetchFinancialPerformance = async () => {
    const res = await api.get(`/statistics/financial-performance`);
    return res.data.map((item) => ({
      ...item,
      monthLabel: t(getMonthNameByNumber(item.month)),
    }));
  };
  const { data, loading, error } = useFetch(fetchFinancialPerformance);

  const totals = data?.reduce(
    (acc, item) => {
      acc.expenses += item.expenses;
      acc.income += item.income;
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const profit = totals?.income - totals?.expenses || 0;
  const profitPercentage =
    totals?.income > 0
      ? ((profit / totals.income) * 100).toFixed(2) + "%"
      : "0%";

  const statsData = [
  {
    title: t("financialPerformance.stats.income.title"),
    value: formatCurrencyDZD(totals?.income || 0),
    subLabel: t("financialPerformance.stats.income.subLabel"),
    icon: CardReceive,
    bgColor: "bg-[#DCFCE7]",
    iconColor: "#00A63E",
  },
  {
    title: t("financialPerformance.stats.expenses.title"),
    value: formatCurrencyDZD(totals?.expenses || 0),
    subLabel: t("financialPerformance.stats.expenses.subLabel"),
    icon: CardSend,
    bgColor: "bg-[#FFE2E2]",
    iconColor: "#FB2C36",
  },
  {
    title: t("financialPerformance.stats.profit.title"),
    value: formatCurrencyDZD(profit),
    subLabel: t("financialPerformance.stats.profit.subLabel"),
    icon: DollarSquare,
    bgColor: "bg-[#FEF3C6]",
    iconColor: "#D08700",
  },
  {
    title: t("financialPerformance.stats.profitPercentage.title"),
    value: profitPercentage,
    subLabel: t("financialPerformance.stats.profitPercentage.subLabel"),
    icon: Chart2,
    bgColor: "bg-[#DBEAFE]",
    iconColor: "#1447E6",
  },
];

  if (error) return <ErrorPage error={error} />;

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
        <FinancialJournalChart data={data} loading={loading} />
        <FinancialJournalTable data={data} loading={loading} />
        <EmployeeJournalTable />
      </div>
    </div>
  );
}
