import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function RecentReportsTable() {
  const reportsData = [
    {
      childName: "يوسف أحمد",
      teacherName: "أ. جديدة",
      class: "تحضيري أ",
      type: "صحي",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      childName: "يوسف أحمد",
      teacherName: "تحت المراجعة",
      class: "تحضيري أ",
      type: "صحي",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      childName: "يوسف أحمد",
      teacherName: "تحت المراجعة",
      class: "تحضيري أ",
      type: "صحي",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      childName: "يوسف أحمد",
      teacherName: "جديد",
      class: "تحضيري أ",
      type: "صحي",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      childName: "يوسف أحمد",
      teacherName: "تحت المراجعة",
      class: "تحضيري أ",
      type: "صحي",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      childName: "يوسف أحمد",
      teacherName: "تحت المراجعة",
      class: "تحضيري أ",
      type: "صحي",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      childName: "يوسف أحمد",
      teacherName: "تحت المراجعة",
      class: "تحضيري أ",
      type: "صحي",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
  ];
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-right text-foreground">
          سجل التقارير الأخيرة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right text-muted-foreground">
                اسم الطفل
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                اسم المعلمة
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                الفصل
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                النوع
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                الحالة
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportsData.map((report, index) => (
              <TableRow key={index}>
                <TableCell className="text-foreground font-medium">
                  {report.childName}
                </TableCell>
                <TableCell className="text-foreground">
                  {report.teacherName}
                </TableCell>
                <TableCell className="text-foreground">
                  {report.class}
                </TableCell>
                <TableCell className="text-foreground">{report.type}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`$ {
                          report.status === "جديد" ? "bg-primary-foreground text-primary" : "bg-muted text-muted-foreground"
                        }`}
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    {report.actions}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
