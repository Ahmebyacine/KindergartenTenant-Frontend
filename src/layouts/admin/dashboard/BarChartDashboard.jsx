import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function BarChartDashboard() {
  const financialData = [
    { month: "يناير", income: 8500, expenses: 3200 },
    { month: "فبراير", income: 2200, expenses: 9800 },
    { month: "مارس", income: 8800, expenses: 3500 },
    { month: "أبريل", income: 7500, expenses: 2200 },
    { month: "مايو", income: 6800, expenses: 1800 },
    { month: "يونيو", income: 6500, expenses: 1500 },
  ];
  return (
    <Card className="gap-3" dir="ltr">
      <CardHeader>
        <CardTitle className="text-right text-foreground">
          ملخص الأداء المالي الشهري
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%" minWidth={500}>
            <BarChart data={financialData}>
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
            <span className="text-sm text-muted-foreground">الدخل (د.ج)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
            <span className="text-sm text-muted-foreground">
              المصروفات (د.ج)
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
