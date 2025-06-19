import { Card, CardContent } from "@/components/ui/card";
import { Chart2, Coin, Money2, People } from "iconsax-react";
import LineChartDashboard from "@/layouts/admin/dashboard/LineChartDashboard";
import BarChartDashboard from "@/layouts/admin/dashboard/BarChartDashboard";
import RecentReportsTable from "@/layouts/admin/dashboard/RecentReportsTable";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { i18n } = useTranslation();
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/incomes" className="no-underline">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">
                    إجمالي الدخل الشهري
                  </p>
                  <div className="w-10 h-10 bg-[#B9F8CF] rounded-xl flex items-center justify-center">
                    <Coin size={24} color="#00C951" />
                  </div>
                </div>

                <div className="text-right mt-1">
                  <p className="text-[22px] font-bold text-foreground">
                    {formatCurrencyDZD(12500, i18n.language)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/expenses" className="no-underline">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">
                    إجمالي المدفوعات
                  </p>
                  <div className="w-10 h-10 bg-[#FFC9C9] rounded-xl flex items-center justify-center">
                    <Money2 size={24} color="#FB2C36" />
                  </div>
                </div>

                <div className="text-right mt-1">
                  <p className="text-[22px] font-bold text-foreground">
                    {formatCurrencyDZD(8300000, i18n.language)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">
                  تقارير قيد المراجعة
                </p>
                <div className="w-10 h-10 bg-[#FEE685] rounded-xl flex items-center justify-center">
                  <Chart2 size={24} color="#FD9A00" />
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">
                  4 تقارير
                </p>
              </div>
            </CardContent>
          </Card>
          <Link to="/students" className="no-underline">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">عدد الأطفال</p>
                  <div className="w-10 h-10 bg-[#A2F4FD] rounded-xl flex items-center justify-center">
                    <People size={24} color="#00A6F4" />
                  </div>
                </div>

                <div className="text-right mt-1">
                  <p className="text-[22px] font-bold text-foreground">
                    60 طفل
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link to="/attendance" className="no-underline">
            <LineChartDashboard />
          </Link>
          <BarChartDashboard />
        </div>

        {/* Reports Table */}
        <RecentReportsTable />
      </div>
    </div>
  );
}
