import { Card, CardContent } from "@/components/ui/card";
import {
  Archive,
  CardReceive,
  Chart2,
  TickSquare,
} from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { useTranslation } from "react-i18next";
import IncomesTable from "@/layouts/admin/incomes/IncomesTable";

export default function Incomes() {
  const { i18n } = useTranslation();
  const tableData = [
  {
    month: "جانفي",
    schoolYear: "2023-2024",
    invoiceCount: 12,
    totalAmount: 120000,
    averageInvoice: 10000,
    collectionRate: "85%",
    monthlyComparison: "+5%"
  },
  {
    month: "فيفري",
    schoolYear: "2023-2024",
    invoiceCount: 9,
    totalAmount: 90000,
    averageInvoice: 108000,
    collectionRate: "78%",
    monthlyComparison: "-2%"
  },
  {
    month: "مارس",
    schoolYear: "2023-2024",
    invoiceCount: 15,
    totalAmount: 150000,
    averageInvoice: 10000,
    collectionRate: "92%",
    monthlyComparison: "+10%"
  },
  {
    month: "أفريل",
    schoolYear: "2023-2024",
    invoiceCount: 7,
    totalAmount: 70000,
    averageInvoice: 10000,
    collectionRate: "60%",
    monthlyComparison: "-8%"
  }
];

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="flex items-center w-full">
                  <div className="flex items-center justify-between w-full gap-2">
                    <p className="text-sm text-muted-foreground mb-1">
                      إجمالي المداخيل
                    </p>
                    <div className="w-10 h-10 bg-[#DCFCE7] rounded-xl flex items-center justify-center">
                      <CardReceive size={24} color="#00A63E" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">
                  {formatCurrencyDZD(125000, i18n.language)}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  المبلغ المحصل خلال السنة الحالية
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">عدد المسددين</p>
                <div className="w-10 h-10 bg-[#EDE9FE] rounded-xl flex items-center justify-center">
                  <TickSquare size={24} color="#7008E7" />
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">92 ولي</p>
                <p className="text-xs text-muted-foreground mb-1">
                  عدد أولياء الأمور الذين أتموا الدفع كليًا
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">عدد الفواتير</p>
                <div className="w-10 h-10 bg-[#FEF3C6] rounded-xl flex items-center justify-center">
                  <Archive size={24} color="#E17100" />
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">
                  350 فاتورة
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  إجمالي الفواتير الصادرة لجميع الفصول
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">نسبة التحصيل</p>
                <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center">
                  <Chart2 size={24} color="#1447E6" />
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">83%</p>
                <p className="text-xs text-muted-foreground mb-1">
                  نسبة ما تم تحصيله من مجموع الرسوم
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Reports Table */}
        <IncomesTable incomes={tableData} />
      </div>
    </div>
  );
}
