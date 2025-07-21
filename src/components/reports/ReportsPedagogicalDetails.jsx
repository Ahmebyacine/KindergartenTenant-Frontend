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
import api from "@/services/api";
import useFetch from "@/hooks/useFetch";
import Loading from "@/pages/common/Loading";
import DetailItem from "../DetailItem";
import { formatDate } from "@/utils/dateFormatter";
import { getOverallBadge } from "@/utils/getStatusBadges";

export default function ReportsPedagogicalDetails() {
  const { reportId } = useParams();

  const fetchreportsDetails = async () => {
    const response = await api.get(`/pedagogical-reports/${reportId}`);
    return response.data;
  };

  const { data: reportDetails, loading } = useFetch(fetchreportsDetails);

  if (loading) return <Loading />;

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
              <ChevronRight />
              تفاصيل التقرير البيداغوجي
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
                    to="/reports?tab=pedagogical"
                    className="font-cairo text-muted-foreground"
                  >
                    التقارير البيداغوجية
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
                  value={reportDetails?.teacher?.name}
                />
                <DetailItem
                  label="الفصل"
                  value={reportDetails.class?.className}
                />
                <DetailItem
                  label="التاريخ"
                  value={formatDate(reportDetails.createdAt)}
                />
              </div>
            </div>

            {/* Condition Details */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                التقييمات
              </h2>
              <div className="space-y-1">
                <DetailItem
                  label="اللغة والتواصل"
                  value={reportDetails?.languageAndCommunication}
                />
                <DetailItem label="السلوك" value={reportDetails?.behavior} />
                <DetailItem label="المهارات" value={reportDetails?.skills} />
                <DetailItem
                  label="التقييم العام"
                  value={getOverallBadge(reportDetails?.overall)}
                />
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
