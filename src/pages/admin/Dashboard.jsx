import { Chart2, Coin, Money2, People } from "iconsax-react";
import BarChartDashboard from "@/layouts/admin/dashboard/BarChartDashboard";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatCard from "@/components/StatCard";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";

export default function Dashboard() {
  const { i18n } = useTranslation();

  const stats = [
    {
      title: "إجمالي الدخل الشهري",
      value: formatCurrencyDZD(12500, i18n.language),
      icon: Coin,
      iconColor:"#00C951",
      bgColor: "bg-[#B9F8CF]",
      to: "/incomes",
    },
    {
      title: "إجمالي المدفوعات",
      value: formatCurrencyDZD(8300000, i18n.language),
      icon: Money2,
      iconColor:"#FB2C36",
      bgColor: "bg-[#FFC9C9]",
      to: "/expenses",
    },
    {
      title: "تقارير قيد المراجعة",
      value: "4 تقارير",
      icon: Chart2,
      iconColor:"#FD9A00",
      bgColor: "bg-[#FEE685]",
    },
    {
      title: "عدد الأطفال",
      value: "60 طفل",
      icon: People,
      iconColor:"#00A6F4",
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
          <Link to="/attendance" className="no-underline">
            <LineChartAttendnce />
          </Link>
          <BarChartDashboard />
        </div>

        {/* Reports Table */}
        <RecentReportsTable />
      </div>
    </div>
  );
}
