import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function LineChartAttendnce() {
  const attendanceData = [
    { month: "يناير", attendance: 26.5, absence: 26.2 },
    { month: "فبراير", attendance: 26.8, absence: 26.7 },
    { month: "مارس", attendance: 28.2, absence: 26.1 },
    { month: "أبريل", attendance: 26.8, absence: 26.5 },
    { month: "مايو", attendance: 26.2, absence: 27.1 },
    { month: "يونيو", attendance: 26.1, absence: 26.8 },
  ];
  return (
    <Card className="bg-card border-border" dir="ltr">
      <CardHeader>
        <CardTitle className="text-right text-foreground">
          مقارنة بين الحضور والغياب شهريا
        </CardTitle>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--chart-6)] rounded-full"></div>
            <span className="text-sm text-muted-foreground">الغياب</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">الحضور</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className={"overflow-x-auto px-0"}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%" minWidth={500}>
            <LineChart data={attendanceData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                domain={[25, 29]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
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
        </div>
      </CardContent>
    </Card>
  );
}
