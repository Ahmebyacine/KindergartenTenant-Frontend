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
import useFetch from "@/hooks/useFetch";
import api from "@/services/api";
import React from "react";
import LoadingTable from "../LoadingTable";
import { Link } from "react-router-dom";
import {
  getAssessmentBadge,
  getOverallBadge,
  getReportTypeBadge,
  getStatusPayBadge,
} from "@/utils/getStatusBadges";

export default function RecentReportsTable() {
  const fetchReports = async () => {
    const res = await api.get(`/reports/recent`);
    return res.data;
  };
  const { data: reports, loading, error } = useFetch(fetchReports);
  console.log(reports);
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <LoadingTable />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500">
                  فشل تحميل التقارير
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  لا توجد تقارير حديثة
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell className="text-foreground font-medium">
                    {report?.student?.firstName} {report?.student?.lastName}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {report?.teacher?.name || report?.generatedBy?.name}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {report?.class?.className}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {getReportTypeBadge(report?.type)}
                  </TableCell>
                  <TableCell>
                    { report?.status && getStatusPayBadge(report?.status) ||
                      report?.overall && getOverallBadge(report?.overall) ||
                      report?.conditionAssessment && getAssessmentBadge(report?.conditionAssessment)}
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="text-primary p-0 h-auto">
                      <Link
                        to={
                          report?.type === "financial"
                            ? `/reports/financial/${report._id}`
                            : report?.type === "pedagogical"
                            ? `/reports/pedagogical/${report._id}`
                            : report?.type === "health" &&
                              `/reports/health/${report._id}`
                        }
                      >
                        عرض التفاصيل
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
