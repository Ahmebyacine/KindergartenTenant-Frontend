import { CardReceive, Chart2, Danger, People } from "iconsax-react";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import BarChartRecivedMoney from "@/components/dashboard/BarChartRecivedMoney";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";
import api from "@/api";
import useFetch from "@/hooks/useFetch";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import {getTextNumberChild } from "@/utils/getTextNumberChild";
import { t } from "i18next";

export default function DashboardTeacher() {
  const fetchSummaryAdmin = async () => {
    const res = await api.get(`/statistics/summary/user`);
    return res.data;
  };
  const { data, loading, error } = useFetch(fetchSummaryAdmin);
  // Card data as JSON array
  const stats = [
    {
      title: t("teacherDashboard.studentCount"),
      value: getTextNumberChild(data?.studentCount || 0),
      icon: People,
      iconColor: "#00A6F4",
      bgColor: "bg-[#CEFAFE]",
      to: "/teacher-students",
    },
    {
      title: t("teacherDashboard.reportsThisMonth"),
      value: `${data?.reportCount || 0} ${t("teacherDashboard.reportUnit")}`,
      icon: Chart2,
      iconColor: "#FD9A00",
      bgColor: "bg-[#FEF3C6]",
      to: "/teacher-reports",
    },
    {
      title: t("teacherDashboard.receivedMoney"),
      value: formatCurrencyDZD(data?.totalIncome || 0),
      icon: CardReceive,
      iconColor: "#10B981",
      bgColor: "bg-[#DCFCE7]",
    },
    {
      title: t("teacherDashboard.absentChildren"),
      value: `${data?.absentCount || 0} ${t("teacherDashboard.childrenUnit")}`,
      icon: Danger,
      iconColor: "#FB2C36",
      bgColor: "bg-[#FFE2E2]",
      to: "/teacher-attendance",
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
                .map((_, idx) => <StatCard key={idx} loading={loading} error={error} />)
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
          <Link to="/teacher-attendance" className="no-underline">
            <LineChartAttendnce />
          </Link>
        </div>
        {/* Reports Table */}
        <RecentReportsTable />
      </div>
    </div>
  );
}
