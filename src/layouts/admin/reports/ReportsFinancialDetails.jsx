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
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";

const DetailItem = ({ label, value }) => (
  <div className="flex py-1">
    <span className="text-muted-foreground font-cairo ml-5">{label}:</span>
    {typeof value === "string" ? (
      <span className="text-foreground mx-2 font-medium font-cairo">
        {value}
      </span>
    ) : (
      value
    )}
  </div>
);

export default function ReportsFinancialDetails() {
  const reportDetails = {
  invoiceNumber: 1,
  studentName: "لبيان بدر",
  guardian: "بدر أور",
  class: "روحه ب",
  month: "مايو 2025",
  amount: 8000,
  issueDate: "2025 مايو 1",
  status: "مدفوع",
  paymentMethod: "نقدًا",
  employee: "أحمد بن يوسف",
  notes: "تم الدفع نقدًا يوم الخميس في الإدارة."
};

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
                <DetailItem label="اسم الطفل" value={reportDetails.studentName} />
                <DetailItem label="ولي الأمر" value={reportDetails.guardian} />
                <DetailItem label="الفصل" value={reportDetails.class} />
                <DetailItem label="الشهر" value={reportDetails.month} />
                <DetailItem label="المبلغ" value={formatCurrencyDZD(reportDetails.amount)} />
                <DetailItem label="تاريخ إصدار الفاتورة" value={reportDetails.issueDate} />
                <DetailItem
                  label="الحالة"
                  value={
                    <Badge className="bg-[#fef3c6] text-[#10a735] hover:bg-[#fef3c6] border-0 rounded-md px-3 py-1 font-cairo">
                      {reportDetails.status}
                    </Badge>
                  }
                />
                <DetailItem
                  label="طريقة الدفع"
                  value={reportDetails.paymentMethod}
                />
                <DetailItem
                  label="الموظف المستلم للمبلغ"
                  value={reportDetails.employee}
                />
              </div>
            </div>
            {/* Notes */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                ملاحظات
              </h2>
              <p className="text-foreground leading-relaxed font-cairo">
                {reportDetails.notes}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
