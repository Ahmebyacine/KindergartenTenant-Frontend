import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import api from "@/api";
import useFetch from "@/hooks/useFetch";
import Loading from "@/pages/common/Loading";
import DetailItem from "../DetailItem";
import { formatDate } from "@/utils/dateFormatter";
import { getOverallBadge } from "@/utils/getStatusBadges";
import { t } from "i18next";

export default function ReportsPedagogicalDetails() {
  const { reportId } = useParams();

  const fetchreportsDetails = async () => {
    const response = await api.get(`/pedagogical-reports/${reportId}`);
    return response.data;
  };

  const { data: reportDetails, loading } = useFetch(fetchreportsDetails);

  if (loading) return <Loading sidebar={false}/>;

  return (
    <div className="bg-background p-6 font-cairo">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col">
          <Link
            to="/reports?tab=pedagogical"
            className="font-cairo text-muted-foreground"
          >
            <h1 className="text-2xl flex items-center font-bold text-foreground font-cairo mb-2">
              <ChevronLeft className="rtl:rotate-180" />
              {t("reports.pedagogical.title")}
            </h1>
          </Link>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/reports"
                    className="font-cairo text-muted-foreground"
                  >
                    {t("reports.title")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/reports?tab=pedagogical"
                    className="font-cairo text-muted-foreground"
                  >
                    {t("reports.pedagogical.title")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-cairo text-primary font-medium">
                  {t("common.details")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Report Details Card */}
        <Card className="bg-card border border-border shadow-sm">
          <CardHeader className="border-b border-border px-6">
            <CardTitle className="text-lg font-semibold text-foreground font-cairo">
              {t("reports.reportNumber")}: {reportDetails._id}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            {/* Child Information */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                {t("reports.pedagogical.childInfo")}
              </h2>
              <div className="space-y-1">
                <DetailItem
                  label={t("reports.pedagogical.childName")}
                  value={`${reportDetails?.student?.firstName} ${reportDetails?.student?.lastName}`}
                />
                <DetailItem
                  label={t("reports.pedagogical.teacherName")}
                  value={reportDetails?.teacher?.name}
                />
                <DetailItem
                  label={t("reports.pedagogical.class")}
                  value={reportDetails.class?.className}
                />
                <DetailItem
                  label={t("reports.pedagogical.createdAt")}
                  value={formatDate(reportDetails.createdAt)}
                />
              </div>
            </div>

            {/* Condition Details */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                {t("reports.pedagogical.conditionDetails")}
              </h2>
              <div className="space-y-1">
                <DetailItem
                  label={t("reports.pedagogical.languageAndCommunication")}
                  value={t(`reports.pedagogical.evaluationOptions.${reportDetails?.languageCommunication}`)}
                />
                <DetailItem
                  label={t("reports.pedagogical.behavior")}
                  value={t(`reports.pedagogical.evaluationOptions.${reportDetails?.behavior}`)}
                />
                <DetailItem
                  label={t("reports.pedagogical.skills")}
                  value={t(`reports.pedagogical.evaluationOptions.${reportDetails?.skills}`)}
                />
                <DetailItem
                  label={t("reports.pedagogical.overall")}
                  value={getOverallBadge(reportDetails?.overall)}
                />
              </div>
            </div>

            {/* Notes */}
            {reportDetails.notes && (
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                  {t("reports.pedagogical.notes")}
                </h2>
                <p className="text-foreground leading-relaxed font-cairo">
                  {reportDetails.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
