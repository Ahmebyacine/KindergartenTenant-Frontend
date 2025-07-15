import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import api from "@/services/api";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import { Chart1 } from "iconsax-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Skeleton } from "../ui/skeleton";

export default function BarChartRecivedMoney() {
  const fetchAttendaceSummary = async () => {
    const res = await api.get(`/financial-reports/summary/user`);
    return res.data.map((item) => ({
      ...item,
      monthLabel: getMonthNameByNumber(item.month),
    }));
  };
  const { data, loading } = useFetch(fetchAttendaceSummary);
  return (
    <Card dir="ltr">
      <CardHeader>
        <CardTitle className="text-right text-foreground">
          المبالغ المستلمة شهريا
        </CardTitle>
      </CardHeader>
      {loading ? (
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
          <CardContent className="overflow-x-auto px-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={300}>
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
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
                    dataKey="totalAmount"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={70}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className={"justify-center"}>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  المبالغ المستلمة (د.ج)
                </span>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
