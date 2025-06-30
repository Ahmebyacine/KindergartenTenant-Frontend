import { Card, CardContent } from "@/components/ui/card";
import { Archive, Chart2, Coin, Money2, People } from "iconsax-react";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Link } from "react-router-dom";
import BarChartRecivedMoney from "@/components/dashboard/BarChartRecivedMoney";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";
import i18n from "@/i18n";
import StatCard from "@/components/StatCard";

export default function DashboardSupervisor() {
  const stats = [
    {
      title: "إجمالي المبالغ المستلمة",
      value: formatCurrencyDZD(12500, i18n.language),
      icon: Coin,
      iconColor: "#00C951",
      bgColor: "bg-[#B9F8CF]",
      to: "/supervisor-incomes",
    },
    {
      title: "عدد العمليات",
      value: "18 عملية",
      icon: Archive,
      iconColor: "#4F46E5",
      bgColor: "bg-[#DDD6FF]",
    },
    {
      title: "تقارير قيد المراجعة",
      value: "4 تقارير",
      icon: Chart2,
      iconColor: "#FD9A00",
      bgColor: "bg-[#FEE685]",
    },
    {
      title: "عدد الأطفال",
      value: "60 طفل",
      icon: People,
      iconColor: "#00A6F4",
      bgColor: "bg-[#A2F4FD]",
      to: "/students",
    },
  ];
  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) =>
            stat.to ? (
              <Link to={stat.to} className="no-underline" key={idx}>
                <StatCard stat={stat} />
              </Link>
            ) : (
              <StatCard key={idx} stat={stat} />
            )
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartRecivedMoney />
          <Link to="/supervisor-attendance" className="no-underline">
            <LineChartAttendnce />
          </Link>
        </div>

        {/* Reports Table */}
        <RecentReportsTable />
      </div>
    </div>
  );
}
