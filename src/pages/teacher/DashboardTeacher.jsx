import {
  Chart2,
  Danger,
  People,
  TickSquare,
} from "iconsax-react";
import RecentReportsTable from "@/components/dashboard/RecentReportsTable";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import BarChartRecivedMoney from "@/components/dashboard/BarChartRecivedMoney";
import LineChartAttendnce from "@/components/dashboard/LineChartAttendnce";

export default function DashboardTeacher() {
  // Card data as JSON array
  const stats = [
    {
      title: "عدد الاطفال في القسم",
      value: "24 طفلًا",
      icon: People,
      iconColor: "#00A6F4",
      bgColor: "bg-[#CEFAFE]",
      to: "/teacher-students",
    },
    {
      title: "تقاريري هذا الشهر",
      value: "12 تقريرًا",
      icon: Chart2,
      iconColor: "#FD9A00",
      bgColor: "bg-[#FEF3C6]",
      to: "/teacher-reports",
    },
    {
      title: "آخر تسجيل حضور",
      value: "17 جوان",
      icon: TickSquare,
      iconColor: "#10B981",
      bgColor: "bg-[#DCFCE7]",
      to: "/teacher-attendance",
    },
    {
      title: "الأطفال الغائبون اليوم",
      value: "3 أطفال",
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
          {stats.map((stat, idx) => (
            <Link to={stat.to} className="no-underline" key={idx}>
              <StatCard stat={stat} />
            </Link>
          ))}
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
