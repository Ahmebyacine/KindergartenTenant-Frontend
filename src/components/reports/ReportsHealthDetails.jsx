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

const DetailItem = ({ label, value }) => (
  <div className="flex py-1">
    <span className="text-muted-foreground font-cairo">{label}:</span>
    {typeof value === "string" ? (
      <span className="text-foreground mx-2 font-medium font-cairo">
        {value}
      </span>
    ) : (
      value
    )}
  </div>
);

export default function ReportHealthDetails() {
  const reportDetails = {
    reportId: "1",
    childName: "ليان بدر",
    teacher: "أ. نوال",
    class: "روضة ب",
    date: "20 مايو 2025",
    observationTime: "10:45 صباحًا",
    conditionType: "حرارة",
    conditionAssessment: "متوسطة",
    actionTaken: "نعم",
    guardianContacted: "نعم",
    actionType: "راحة في العيادة لمدة ساعة",
    notes:
      "لاحظت احمرارًا في وجه الطفل وتعبًا واضحًا. تم قياس حرارته وإراحته في غرفة العيادة. وتم إبلاغ ولي الأمر هاتفيًا.",
  };

  return (
    <div className="bg-background p-6 font-cairo">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col">
          <Link to="/reports?tab=health" className="font-cairo text-muted-foreground">
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
                <DetailItem label="اسم الطفل" value={reportDetails.childName} />
                <DetailItem label="المعلمة" value={reportDetails.teacher} />
                <DetailItem label="الفصل" value={reportDetails.class} />
                <DetailItem label="التاريخ" value={reportDetails.date} />
                <DetailItem
                  label="وقت الملاحظة"
                  value={reportDetails.observationTime}
                />
              </div>
            </div>

            {/* Condition Details */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3 pb-3 border-b border-border font-cairo">
                تفاصيل الحالة
              </h2>
              <div className="space-y-1">
                <DetailItem
                  label="نوع الحالة"
                  value={reportDetails.conditionType}
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
                  value={reportDetails.actionTaken}
                />
                <DetailItem
                  label="تم التواصل مع ولي الأمر؟"
                  value={reportDetails.guardianContacted}
                />
                <DetailItem
                  label="نوع الإجراء"
                  value={reportDetails.actionType}
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
