import { Chart2, Coin, Danger, People } from "iconsax-react";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Link } from "react-router-dom";
import BarChartRecivedMoney from "@/components/dashboard/BarChartRecivedMoney";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";
import StatCard from "@/components/StatCard";
import api from "@/api";
import useFetch from "@/hooks/useFetch";
import { getTextNumberChild } from "@/utils/getTextNumberChild";
import { t } from "i18next";

export default function DashboardSupervisor() {
  const fetchSummarySupervisor = async () => {
    const res = await api.get(`/statistics/summary/user`);
    return res.data;
  };

  const { data, loading, error } = useFetch(fetchSummarySupervisor);

  const stats = [
    {
      title: t("dashboardSupervisor.monthlyReceived"),
      value: formatCurrencyDZD(data?.totalIncome || 0),
      icon: Coin,
      iconColor: "#00C951",
      bgColor: "bg-[#B9F8CF]",
    },
    {
      title: t("dashboardSupervisor.absentChildren"),
      value: `${data?.absentCount || 0} ${t("attendance.children")}`,
      icon: Danger,
      iconColor: "#FB2C36",
      bgColor: "bg-[#FFE2E2]",
      to: "/supervisor-attendance",
    },
    {
      title: t("dashboardSupervisor.pendingReports"),
      value: `4 ${t("dashboard.reports")}`,
      icon: Chart2,
      iconColor: "#FD9A00",
      bgColor: "bg-[#FEE685]",
    },
    {
      title: t("dashboardSupervisor.childrenCount"),
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
