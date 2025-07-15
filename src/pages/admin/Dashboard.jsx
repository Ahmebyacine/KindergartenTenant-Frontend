import { Chart2, Coin, Money2, People } from "iconsax-react";
import BarChartDashboard from "@/layouts/admin/dashboard/BarChartDashboard";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";
import api from "@/services/api";
import useFetch from "@/hooks/useFetch";

export default function Dashboard() {
  const fetchSummaryAdmin = async () => {
    const res = await api.get(`/statistics/summary/admin`);
    return res.data;
  };
  const { data, loading } = useFetch(fetchSummaryAdmin);
  const stats = [
    {
      title: "الدخل الشهري",
      value: formatCurrencyDZD(data?.totalIncome || 0),
      icon: Coin,
      iconColor: "#00C951",
      bgColor: "bg-[#B9F8CF]",
      to: "/incomes",
    },
    {
      title: "المدفوعات الشهرية",
      value: formatCurrencyDZD(data?.totalExpenses || 0),
      icon: Money2,
      iconColor: "#FB2C36",
      bgColor: "bg-[#FFC9C9]",
      to: "/expenses",
    },
    {
      title: "تقارير قيد المراجعة",
      value: "0 تقارير",
      icon: Chart2,
      iconColor: "#FD9A00",
      bgColor: "bg-[#FEE685]",
    },
    {
      title: "عدد الأطفال",
      value: `${data?.studentCount} طفل`,
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
          {loading
            ? Array(4)
                .fill(null)
                .map((_, idx) => <StatCard key={idx} loading={true} />)
            : stats.map((stat, idx) =>
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
          <Link to="/financial-performance" className="no-underline">
            <BarChartDashboard />
          </Link>
          <Link to="/attendance" className="no-underline">
            <LineChartAttendnce />
          </Link>
        </div>

        {/* Reports Table */}
        <RecentReportsTable />
      </div>
    </div>
  );
}
