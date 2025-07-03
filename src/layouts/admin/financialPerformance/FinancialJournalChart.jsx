import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function FinancialJournalChart({ data }) {
  return (
    <Card className="shadow-sm p-4 mb-4" dir="ltr">
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
                dataKey="month"
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
                dataKey="المصاريف"
                fill="var(--chart-6)"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="المداخيل"
                fill="var(--primary)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className={" justify-center"}>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#fb2c36] rounded"></div>
            <span className="text-sm text-gray-600">المصاريف</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#1447e6] rounded"></div>
            <span className="text-sm text-gray-600">المداخيل</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
