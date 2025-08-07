import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import api from "@/api";
import useFetch from "@/hooks/useFetch";
import Loading from "@/pages/common/Loading";
import { formatDateMonth, formatDateTime } from "@/utils/dateFormatter";
import { getStatusPayBadge } from "@/utils/getStatusBadges";
import { Button } from "../ui/button";
import { Notification, TickSquare } from "iconsax-react";
import DetailItem from "../DetailItem";
import { useState } from "react";
import { toast } from "sonner";

export default function ReportsFinancialDetails() {
  const { reportId } = useParams();
  const [confirming, setConfirming] = useState(false);

  const fetchreportsDetails = async () => {
    const response = await api.get(`/financial-reports/${reportId}`);
    return response.data;
  };

  const {
    data: reportDetails,
    setData: setReportDetails,
    loading,
  } = useFetch(fetchreportsDetails);

  const handleConfirmPayment = async () => {
    setConfirming(true);
    try {
      const response = await api.patch(
        `/financial-reports/${reportId}/confirm-payment`
      );
      setReportDetails((prev) => ({
        ...prev,
        ...response.data,
      }));
      toast.success("the payment confirmed")
    } catch (error) {
      console.error(error);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return <Loading sidebar={false}/>;
  return (
    <div className="bg-background p-6 font-cairo">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col">
          <Link
            to="/reports?tab=financial"
            className="font-cairo text-muted-foreground"
          >
            <h1 className="text-2xl flex items-center font-bold text-foreground font-cairo mb-2">
              <ChevronRight />
              تفاصيل التقرير المالي
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
                    to="/reports?tab=financial"
                    className="font-cairo text-muted-foreground"
                  >
                    التقارير المالية
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
              الفاتورة: {reportDetails.invoiceNumber}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <div>
              <div className="space-y-1">
                <DetailItem
                  label="اسم الطفل"
                  value={`${reportDetails?.student?.firstName} ${reportDetails?.student?.lastName}`}
                />
                <DetailItem
                  label="ولي الأمر"
                  value={reportDetails?.student?.parents?.name}
                />
                <DetailItem
                  label="الفصل"
                  value={reportDetails?.class?.className}
                />
                <DetailItem
                  label="الشهر"
                  value={formatDateMonth(reportDetails.month)}
                />
                <DetailItem
                  label="المبلغ"
                  value={formatCurrencyDZD(reportDetails.amount)}
                />
                <DetailItem
                  label="تاريخ إصدار الفاتورة"
                  value={formatDateTime(reportDetails.createdAt)}
                />
                <DetailItem
                  label="الحالة"
                  value={getStatusPayBadge(reportDetails.status)}
                />
                <DetailItem
                  label="الموظف المستلم للمبلغ"
                  value={reportDetails?.generatedBy?.name}
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
          {reportDetails.status === "unpaid" && (
            <CardFooter className={"gap-4 flex-col sm:flex-row justify-end"}>
              <Button variant={"outline"} className={"text-foreground"}>
                <Notification color="#EFB100" />
                رسال تذكير لولي الأمر
              </Button>
              <Button
                variant={"outline"}
                className={"text-secondary"}
                onClick={handleConfirmPayment}
                disabled={confirming}
              >
                <TickSquare color="currentColor" />
                {confirming ? "...جاري التحديث" : "تمييز كمدفوع"}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
