import { Badge } from "@/components/ui/badge";
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
import { ChevronRight } from "lucide-react";
import DetailItem from "../DetailItem";
import api from "@/api";
import useFetch from "@/hooks/useFetch";
import Loading from "@/pages/common/Loading";
import { formatDate } from "@/utils/dateFormatter";
import { getConditionBadge } from "@/utils/getStatusBadges";

export default function ReportHealthDetails() {
  const { reportId } = useParams();

  const fetchreportsDetails = async () => {
    const response = await api.get(`/health-reports/${reportId}`);
    return response.data;
  };

  const { data: reportDetails, loading } = useFetch(fetchreportsDetails);

  if (loading) return <Loading sidebar={false} />;

  return (
    <div className="bg-background p-6 font-cairo">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col">
          <Link
            to="/reports?tab=health"
            className="font-cairo text-muted-foreground"
          >
            <h1 className="text-2xl flex items-center font-bold text-foreground font-cairo mb-2">
              <ChevronRight />
              تفاصيل التقرير الصحي
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
                    التقارير
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/reports?tab=health"
                    className="font-cairo text-muted-foreground"
                  >
                    التقارير الصحية
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-cairo text-primary font-medium">
                  عرض التفاصيل
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Report Details Card */}
        <Card className="bg-card border border-border shadow-sm">
          <CardHeader className="border-b border-border px-6">
            <CardTitle className="text-lg font-semibold text-foreground font-cairo">
              رقم التقرير: {reportDetails.reportId}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            {/* Child Information */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                بيانات الطفل
              </h2>
              <div className="space-y-1">
                <DetailItem
                  label="اسم الطفل"
                  value={`${reportDetails?.student?.firstName} ${reportDetails?.student?.lastName}`}
                />
                <DetailItem
                  label="المعلمة"
                  value={reportDetails?.generatedBy?.name}
                />
                <DetailItem
                  label="الفصل"
                  value={reportDetails?.class?.className}
                />
                <DetailItem
                  label="التاريخ"
                  value={formatDate(reportDetails.createdAt)}
                />
                <DetailItem
                  label="وقت الملاحظة"
                  value={reportDetails.observationTime}
                />
              </div>
            </div>

            {/* Condition Details */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3 py-3 border-y border-border font-cairo">
                تفاصيل الحالة
              </h2>
              <div className="space-y-1">
                <DetailItem
                  label="نوع الحالة"
                  value={getConditionBadge(reportDetails.conditionType)}
                />
                <DetailItem
                  label="تقييم الحالة"
                  value={
                    <Badge className="bg-[#fef3c6] text-[#e17100] hover:bg-[#fef3c6] border-0 rounded-md px-3 py-1 font-cairo">
                      {reportDetails.conditionAssessment}
                    </Badge>
                  }
                />
                <DetailItem
                  label="تم اتخاذ إجراء؟"
                  value={reportDetails?.actionTaken ? "نعم" : "لا"}
                />
                {reportDetails?.actionTaken && (
                  <DetailItem
                    label="نوع الإجراء"
                    value={reportDetails.actionType}
                  />
                )}
              </div>
            </div>

            {/* Notes */}
            {reportDetails.notes && (
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                  ملاحظات
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
