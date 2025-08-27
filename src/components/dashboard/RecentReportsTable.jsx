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
import api from "@/api";
import React from "react";
import LoadingTable from "../LoadingTable";
import { Link } from "react-router-dom";
import {
  getAssessmentBadge,
  getOverallBadge,
  getReportTypeBadge,
  getStatusPayBadge,
} from "@/utils/getStatusBadges";
import { t } from "i18next";

export default function RecentReportsTable() {
  const fetchReports = async () => {
    const res = await api.get(`/reports/recent`);
    return res.data;
  };
  const { data: reports, loading, error } = useFetch(fetchReports);
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="rtl:text-right text-foreground">
          {t("dashboard.recentReports")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">{t("dashboard.childName")}</TableHead>
              <TableHead className="text-muted-foreground">{t("dashboard.teacherName")}</TableHead>
              <TableHead className="text-muted-foreground">{t("dashboard.class")}</TableHead>
              <TableHead className="text-muted-foreground">{t("dashboard.type")}</TableHead>
              <TableHead className="text-muted-foreground">{t("dashboard.status")}</TableHead>
              <TableHead className="text-muted-foreground">{t("common.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <LoadingTable />
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="!text-center text-red-500 text-xl"
                >
                  {t("dashboard.failedFetchReports")}
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="!text-center text-xl">
                  {t("dashboard.noRecentReports")}
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
                    {(report?.status && getStatusPayBadge(report?.status)) ||
                      (report?.overall && getOverallBadge(report?.overall)) ||
                      (report?.conditionAssessment &&
                        getAssessmentBadge(report?.conditionAssessment))}
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
                        {t("common.details")}
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
