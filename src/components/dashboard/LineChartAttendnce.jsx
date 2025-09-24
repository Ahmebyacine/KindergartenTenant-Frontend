import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import api from "@/api";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Skeleton } from "../ui/skeleton";
import { Chart1, Danger } from "iconsax-react";
import { t } from "i18next";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

export default function LineChartAttendnce() {
  const fetchAttendaceSummary = async () => {
    const res = await api.get(`/attendances/summary`);
    return res.data.map((item) => ({
      ...item,
      monthLabel: t(getMonthNameByNumber(item.month)),
    }));
  };
  const { data, loading, error } = useFetch(fetchAttendaceSummary);

  const chartConfig = {
    attendance: {
      label: t("dashboard.attendance"),
      color: "var(--primary)",
    },
    absence: {
      label: t("dashboard.absence"),
      color: "var(--chart-6)",
    },
  };
  return (
    <Card dir="ltr">
      <CardHeader>
        <CardTitle className="rtl:text-right text-foreground">
          {t("dashboard.attendanceAndAbsence")}
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
                {t("errorApi.defaultError")}
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
                {t("dashboard.noDataTitle")}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {t("dashboard.noDataAttendanceDesc")}
              </p>
            </div>
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent className="overflow-x-auto px-0">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full min-w-[500px] max-h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
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
                  <ChartTooltip content={<ChartTooltipContent className="rtl:text-right" />} />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--primary)", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="absence"
                    stroke="var(--chart-6)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-6)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--chart-6)] rounded-full"/>
                <span className="text-sm text-muted-foreground">{t("dashboard.absence")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"/>
                <span className="text-sm text-muted-foreground">{t("dashboard.attendance")}</span>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
