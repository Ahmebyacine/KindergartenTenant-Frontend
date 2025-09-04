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
import { ChevronLeft } from "lucide-react";
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
import { t } from "i18next";

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
      toast.success(t("reports.financial.confirmPaymentSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("reports.financial.confirmPaymentError"));
    } finally {
      setConfirming(false);
    }
  };

  const handleSendNotification = async () => {
    try {
      await api.post(`/financial-reports/${reportId}/reminder-notification`);
      toast.success(t("reports.financial.sendNotificationSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("reports.financial.sendNotificationError"));
    }
  };

  if (loading) return <Loading sidebar={false} />;
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
              <ChevronLeft className="rtl:rotate-180" />
              {t("reports.financial.viewDetails")}
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
                    to="/reports?tab=financial"
                    className="font-cairo text-muted-foreground"
                  >
                    {t("reports.financial.title")}
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
              {t("reports.financial.facture")} {reportDetails._id}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 space-y-4">
            <div>
              <div className="space-y-1">
                <DetailItem
                  label={t("reports.financial.studentName")}
                  value={`${reportDetails?.student?.firstName} ${reportDetails?.student?.lastName}`}
                />
                <DetailItem
                  label={t("reports.financial.parentName")}
                  value={reportDetails?.student?.parents?.name}
                />
                <DetailItem
                  label={t("reports.financial.className")}
                  value={reportDetails?.class?.className}
                />
                <DetailItem
                  label={t("reports.financial.month")}
                  value={formatDateMonth(reportDetails.month)}
                />
                <DetailItem
                  label={t("reports.financial.amount")}
                  value={formatCurrencyDZD(reportDetails.amount)}
                />
                <DetailItem
                  label={t("reports.financial.createdAt")}
                  value={formatDateTime(reportDetails.createdAt)}
                />
                <DetailItem
                  label={t("reports.financial.status")}
                  value={getStatusPayBadge(reportDetails.status)}
                />
                <DetailItem
                  label={t("reports.financial.generatedBy")}
                  value={reportDetails?.generatedBy?.name}
                />
                <DetailItem
                  label={t("reports.financial.paidTo")}
                  value={reportDetails?.paidTo?.name || "لا يوجد"}
                />
              </div>
            </div>
            {/* Notes */}
            {reportDetails.notes && (
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                  {t("common.notes")}
                </h2>
                <p className="text-foreground leading-relaxed font-cairo">
                  {reportDetails.notes}
                </p>
              </div>
            )}
          </CardContent>
          {reportDetails.status === "unpaid" && (
            <CardFooter className={"gap-4 flex-col sm:flex-row justify-end"}>
              <Button
                variant={"outline"}
                className={"text-foreground"}
                onClick={handleSendNotification}
              >
                <Notification color="#EFB100" />
                {t("reports.financial.reminder")}
              </Button>
              <Button
                variant={"outline"}
                className={"text-secondary"}
                onClick={handleConfirmPayment}
                disabled={confirming}
              >
                <TickSquare color="currentColor" />
                {confirming
                  ? t("common.saving")
                  : t("reports.financial.markAsPaid")}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
