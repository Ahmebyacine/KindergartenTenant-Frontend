import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import api from "@/api";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import { t } from "i18next";
import { Chart1, Danger } from "iconsax-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function BarChartDashboard() {
  const fetchFinancialPerformance = async () => {
    const res = await api.get(`/statistics/financial-performance`);
    return res.data.map((item) => ({
      ...item,
      monthLabel: getMonthNameByNumber(item.month),
    }));
  };
  const { data, loading, error } = useFetch(fetchFinancialPerformance);
  return (
    <Card className="gap-3 h-full" dir="ltr">
      <CardHeader>
        <CardTitle className="text-right text-foreground">
          ملخص الأداء المالي الشهري
        </CardTitle>
      </CardHeader>
      {error ? (
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full text-destructive bg-muted">
              <Danger size={36} color="currentColor" />
              <h3 className="text-lg font-medium text-destructive">
                {error?.status}
              </h3>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-destructive">
                حدث خطأ أثناء تحميل البيانات
              </h3>
              <p className="text-sm text-destructive max-w-sm">
                {t(`errorApi.${error?.message}`)}
              </p>
            </div>
          </div>
        </CardContent>
      ) : loading ? (
        <div className="space-y-4 mx-4">
          <Skeleton className="h-4 w-full rounded-xl" />
          <Skeleton className="h-70 w-full rounded-xl" />
          <div className="flex space-x-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ) : data?.length === 0 ? (
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full text-muted-foreground bg-muted">
              <Chart1 size={36} color="currentColor" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">
                لا توجد بيانات متاحة
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                لم يتم العثور على بيانات الحضور والغياب للفترة المحددة. يرجى
                المحاولة مرة أخرى لاحقاً.
              </p>
            </div>
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent className={"px-0"}>
            <div className="h-64 overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={500}>
                <BarChart data={data}>
                  <XAxis
                    dataKey="monthLabel"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  />
                  <Bar
                    dataKey="expenses"
                    fill="var(--chart-4)"
                    radius={[4, 4, 0, 0]}
                    stackId="a"
                  />
                  <Bar
                    dataKey="income"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                    stackId="a"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className={"justify-center"}>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  الدخل (د.ج)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  المصروفات (د.ج)
                </span>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
