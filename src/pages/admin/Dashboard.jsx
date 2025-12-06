import { Chart2, Coin, Money2, People } from "iconsax-react";
import BarChartDashboard from "@/layouts/admin/dashboard/BarChartDashboard";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";
import api from "@/api";
import useFetch from "@/hooks/useFetch";
import { getTextNumberChild } from "@/utils/getTextNumberChild";
import { t } from "i18next";
import { useCurrency } from "@/hooks/useCurrency";

export default function Dashboard() {
  const { format } = useCurrency();

  const fetchSummaryAdmin = async () => {
    const res = await api.get(`/statistics/summary/admin`);
    return res.data;
  };

  const { data, loading, error } = useFetch(fetchSummaryAdmin);

  const stats = [
    {
      title: t("dashboard.monthlyIncome"),
      value: format(data?.totalIncome || 0),
      icon: Coin,
      iconColor: "#00C951",
      bgColor: "bg-[#B9F8CF]",
      to: "/incomes",
    },
    {
      title: t("dashboard.monthlyExpenses"),
      value: format(data?.totalExpenses || 0),
      icon: Money2,
      iconColor: "#FB2C36",
      bgColor: "bg-[#FFC9C9]",
      to: "/expenses",
    },
    {
      title: t("dashboard.pendingReports"),
      value: "0 " + t("dashboard.reports"),
      icon: Chart2,
      iconColor: "#FD9A00",
      bgColor: "bg-[#FEE685]",
    },
    {
      title: t("dashboard.childrenCount"),
      value: getTextNumberChild(data?.studentCount || 0),
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
          {loading || error
            ? Array(4)
                .fill(null)
                .map((_, idx) => (
                  <StatCard key={idx} loading={loading} error={error} />
                ))
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
