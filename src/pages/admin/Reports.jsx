import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsFinancialTable from "@/layouts/admin/reports/ReportsFinancialTable";
import ReportsHealthTable from "@/layouts/admin/reports/ReportsHealthTable";
import ReportsPedagogicalTable from "@/layouts/admin/reports/ReportsPedagogicalTable";
import { useEffect } from "react";
import api from "@/services/api";
import { useState } from "react";

export default function Reports() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "pedagogical";

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch class categories:", error);
    }
  };
  const fetchStudents = async () => {
    try {
      const response = await api.get("/enrollments");
      setStudents(response.data.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  // Fetch categories dynamically from API
  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const reportsFinancial = [
    {
      id: 1,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "مدفوع",
      actions: "عرض التفاصيل",
    },
    {
      id: 2,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "قيد المراجعة",
      actions: "متابعة",
    },
    {
      id: 3,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "مدفوع",
      actions: "عرض التفاصيل",
    },
    {
      id: 4,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "غير مدفوع",
      actions: "متابعة",
    },
    {
      id: 5,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "مدفوع",
      actions: "عرض التفاصيل",
    },
    {
      id: 6,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "متأخر",
      actions: "متابعة",
    },
    {
      id: 7,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "مدفوع",
      actions: "عرض التفاصيل",
    },
    {
      id: 8,
      child: "يوسف أحمد",
      guardian: "سارة أحمد",
      class: "تحضيري أ",
      month: "ماي",
      amount: "8000 دج",
      status: "مدفوع",
      actions: "عرض التفاصيل",
    },
  ];
  const reportsPedagogical = [
    {
      id: 1,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "15 يناير 2025",
      assessment: "ممتاز",
      assessmentColor: "excellent",
      status: "تمت المراجعة",
      statusType: "view",
    },
    {
      id: 2,
      childName: "مريم حسن",
      teacherName: "أ. علي",
      class: "روضة أولى",
      date: "22 فبراير 2025",
      assessment: "يحتاج متابعة",
      assessmentColor: "needs-followup",
      status: "جديد",
      statusType: "new",
    },
    {
      id: 3,
      childName: "عمر خالد",
      teacherName: "أ. فاطمة",
      class: "تمهيدي ب",
      date: "5 مارس 2025",
      assessment: "جيد جداً",
      assessmentColor: "very-good",
      status: "جديد",
      statusType: "new",
    },
    {
      id: 4,
      childName: "سارة محمد",
      teacherName: "أ. سعيد",
      class: "روضة ثانية",
      date: "18 أبريل 2025",
      assessment: "جيد",
      assessmentColor: "good",
      status: "تمت المراجعة",
      statusType: "view",
    },
    {
      id: 5,
      childName: "آدم علي",
      teacherName: "أ. نورة",
      class: "تحضيري ب",
      date: "3 مايو 2025",
      assessment: "يحتاج تدخل",
      assessmentColor: "needs-intervention",
      status: "تمت المراجعة",
      statusType: "view",
    },
    {
      id: 6,
      childName: "فاطمة إبراهيم",
      teacherName: "أ. يوسف",
      class: "تمهيدي أ",
      date: "12 يونيو 2025",
      assessment: "ممتاز",
      assessmentColor: "excellent",
      status: "تمت المراجعة",
      statusType: "view",
    },
    {
      id: 7,
      childName: "زياد محمود",
      teacherName: "أ. هدى",
      class: "حضانة",
      date: "25 يوليو 2025",
      assessment: "جيد",
      assessmentColor: "good",
      status: "جديد",
      statusType: "new",
    },
    {
      id: 8,
      childName: "لين عبد الله",
      teacherName: "أ. بدر",
      class: "تمهيدي ج",
      date: "9 أغسطس 2025",
      assessment: "ممتاز",
      assessmentColor: "excellent",
      status: "جديد",
      statusType: "new",
    },
  ];
  const reportsHealth = [
    {
      id: 1,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "خفيفة",
      status: "تحت المراجعة",
      actions: "عرض التفاصيل",
    },
    {
      id: 2,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "متوسطة",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      id: 3,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "خفيفة",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      id: 4,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "متوسطة",
      status: "تحت المراجعة",
      actions: "عرض التفاصيل",
    },
    {
      id: 5,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "خفيفة",
      status: "جديد",
      actions: "عرض التفاصيل",
    },
    {
      id: 6,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "شديدة",
      status: "تحت المراجعة",
      actions: "عرض التفاصيل",
    },
    {
      id: 7,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "خفيفة",
      status: "تحت المراجعة",
      actions: "عرض التفاصيل",
    },
    {
      id: 8,
      childName: "يوسف أحمد",
      teacherName: "أ. خديجة",
      class: "تحضيري أ",
      date: "20 جانفي 2025",
      statusAssessment: "خفيفة",
      status: "تحت المراجعة",
      actions: "عرض التفاصيل",
    },
  ];
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs defaultValue={defaultTab} className="w-full">
            {/* Keep existing TabsList and TabsTrigger styles */}
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 gap-8 md:w-1/2 border-b mb-2">
              <TabsTrigger
                value="pedagogical"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                تقارير بداغوجية
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="rounded-t-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                تقارير مالية
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                تقارير صحية
              </TabsTrigger>
            </TabsList>
            {/* Move TabsContent inside first Tabs component */}
            <TabsContent value="pedagogical" className="space-y-4">
              <ReportsPedagogicalTable reports={reportsPedagogical} classes={classes} students={students} />
            </TabsContent>
            <TabsContent value="financial" className="space-y-4">
              <ReportsFinancialTable reports={reportsFinancial} classes={classes} students={students} />
            </TabsContent>
            <TabsContent value="health" className="space-y-4">
              <ReportsHealthTable reports={reportsHealth} classes={classes} students={students} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
