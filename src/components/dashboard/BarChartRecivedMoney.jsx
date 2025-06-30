import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function BarChartRecivedMoney() {
  const financialData = [
    { month: "يناير", income: 8500 },
    { month: "فبراير", income: 2200 },
    { month: "مارس", income: 8800 },
    { month: "أبريل", income: 7500 },
    { month: "مايو", income: 6800 },
    { month: "يونيو", income: 6500 },
  ];
  return (
    <Card className="bg-card border-border" dir="ltr">
      <CardContent className="p-0.5">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
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
                dataKey="income"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">المبالغ المستلمة (د.ج)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
