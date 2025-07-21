import { Chart2, Coin, Danger, People } from "iconsax-react";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Link } from "react-router-dom";
import BarChartRecivedMoney from "@/components/dashboard/BarChartRecivedMoney";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";
import StatCard from "@/components/StatCard";
import api from "@/services/api";
import useFetch from "@/hooks/useFetch";

export default function DashboardSupervisor() {
  const fetchSummaryAdmin = async () => {
    const res = await api.get(`/statistics/summary/user`);
    return res.data;
  };
  const { data, loading, error } = useFetch(fetchSummaryAdmin);
  const stats = [
    {
      title: "إجمالي المبالغ المستلمة هذا الشهر",
      value: formatCurrencyDZD(data?.totalIncome || 0),
      icon: Coin,
      iconColor: "#00C951",
      bgColor: "bg-[#B9F8CF]",
    },
    {
      title: "الأطفال الغائبون هذا الشهر",
      value: `${data?.absentCount} أطفال`,
      icon: Danger,
      iconColor: "#FB2C36",
      bgColor: "bg-[#FFE2E2]",
      to: "/supervisor-attendance",
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
