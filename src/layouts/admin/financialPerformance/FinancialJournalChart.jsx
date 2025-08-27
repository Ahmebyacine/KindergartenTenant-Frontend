import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "i18next";
import { Chart1 } from "iconsax-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function FinancialJournalChart({ data, loading }) {
  return (
    <Card className="shadow-sm p-4 mb-4" dir="ltr">
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
                {t("financialPerformance.noData")}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {t("financialPerformance.noDataDesc")}
              </p>
            </div>
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent className={"overflow-x-auto px-0"}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={700}>
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--muted-foreground)"
                  />
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
                    fill="var(--chart-6)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="income"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className={" justify-center"}>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#fb2c36] rounded"></div>
                <span className="text-sm text-gray-600">{t("financialPerformance.expenses")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#1447e6] rounded"></div>
                <span className="text-sm text-gray-600">{t("financialPerformance.income")}</span>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
