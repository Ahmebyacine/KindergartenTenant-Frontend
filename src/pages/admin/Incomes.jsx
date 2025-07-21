import {
  Archive,
  CardReceive,
  CardRemove,
  Chart2,
} from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import IncomesTable from "@/layouts/admin/incomes/IncomesTable";
import StatCard from "@/components/StatCard";
import api from "@/services/api";
import useFetch from "@/hooks/useFetch";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import ErrorPage from "../common/ErrorPage";

export default function Incomes() {
  const fetchIncome = async () => {
    const res = await api.get(`/financial-reports/summary`);
    return res.data.map((item) => ({
      ...item,
      monthLabel: getMonthNameByNumber(item.month),
    }));
  };
  const { data, loading, error } = useFetch(fetchIncome);
  const totals = data?.reduce(
    (acc, item) => {
      acc.paidAmount += item.paidAmount;
      acc.unpaidAmount += item.unpaidAmount;
      acc.totalInvoices += item.totalInvoices;

      // Calculate collectionRate? as a weighted average
      acc.totalPaid += item.paidAmount;
      acc.totalDue += item.paidAmount + item.unpaidAmount;

      return acc;
    },
    {
      paidAmount: 0,
      unpaidAmount: 0,
      totalInvoices: 0,
      totalPaid: 0,
      totalDue: 0,
    }
  );

  totals.collectionRate = totals?.totalDue
    ? (totals?.totalPaid / totals?.totalDue) * 100
    : 0;
  const stats = [
    {
      title: "إجمالي المداخيل",
      value: formatCurrencyDZD(totals?.paidAmount || 0),
      subLabel: "المبلغ المحصل خلال السنة الحالية",
      icon: CardReceive,
      bgColor: "bg-[#DCFCE7]",
      iconColor: "#00A63E",
    },
    {
      title: "فواتير غير مسددة",
      value: formatCurrencyDZD(totals?.unpaidAmount || 0),
      icon: CardRemove,
      bgColor: "bg-[#FFE2E2]",
      iconColor: "#FB2C36",
      subLabel: "إجمالي الفواتير الغير مسددة",
    },
    {
      title: "عدد الفواتير",
      value: `${totals?.totalInvoices || 0} فاتورة`,
      icon: Archive,
      bgColor: "bg-[#FEF3C6]",
      iconColor: "#E17100",
      subLabel: "إجمالي الفواتير الصادرة لجميع الفصول",
    },
    {
      title: "نسبة التحصيل",
      value: "%" + (totals?.collectionRate?.toFixed(0) || 0),
      icon: Chart2,
      bgColor: "bg-[#DBEAFE]",
      iconColor: "#1447E6",
      subLabel: "نسبة ما تم تحصيله من مجموع الرسوم",
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
                .map((_, idx) => <StatCard key={idx} loading={true} />)
            : stats.map((stat, idx) => <StatCard key={idx} stat={stat} />)}
        </div>
        {/* Reports Table */}
        <IncomesTable incomes={data} loading={loading} />
      </div>
    </div>
  );
}
