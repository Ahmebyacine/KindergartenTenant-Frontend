import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Card as CardIcon,
  DollarSquare,
  MoneyArchive,
} from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import ExpensesTable from "@/layouts/admin/expenses/ExpensesTable";
import { useTranslation } from "react-i18next";

export default function Expenses() {
  const { i18n } = useTranslation();
  const expensses = [
    {
      quantity: 2,
      description: "إصلاح مكيف",
      date: "2021 مارس 10",
      category: "صيانة",
      amount: "4500",
      payment_method: "تحويل",
      details: "عرض التفاصيل",
    },
    {
      quantity: 1,
      description: "تغيير مصابيح",
      date: "2021 أبريل 05",
      category: "صيانة",
      amount: "2000",
      payment_method: "نقدًا",
      details: "عرض التفاصيل",
    },
    {
      quantity: 3,
      description: "دهان الجدران",
      date: "2021 يناير 18",
      category: "صيانة",
      amount: "7200",
      payment_method: "تحويل",
      details: "عرض التفاصيل",
    },
    {
      quantity: 5,
      description: "صيانة أجهزة الحاسوب",
      date: "2021 يونيو 22",
      category: "صيانة",
      amount: "1000",
      payment_method: "نقدًا",
      details: "عرض التفاصيل",
    },
    {
      quantity: 1,
      description: "تبديل أقفال",
      date: "2021 فبراير 12",
      category: "صيانة",
      amount: "3500",
      payment_method: "تحويل",
      details: "عرض التفاصيل",
    },
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
                      مصاريف هذا الشهر
                    </p>
                    <div className="w-10 h-10 bg-[#EDE9FE] rounded-xl flex items-center justify-center">
                      <Calendar size={24} color="var(--primary)" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">
                  {formatCurrencyDZD(125000, i18n.language)}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  إجمالي المصاريف لشهر مايو
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">
                  مصاريف السنة الحالية
                </p>
                <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center">
                  <DollarSquare size={24} color="#1447E6" />
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">
                  {formatCurrencyDZD(8300000, i18n.language)}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  منذ يناير حتى اليوم
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">
                  عدد المصاريف المسجلة
                </p>
                <div className="w-10 h-10 bg-[#FEF3C6] rounded-xl flex items-center justify-center">
                  <MoneyArchive size={24} color="#E17100" />
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">
                  24 عملية
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  خلال شهر مايو فقط
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-muted-foreground">متوسط المصروف</p>
                <div className="w-10 h-10 bg-[#ECFCCA] rounded-xl flex items-center justify-center">
                  <CardIcon size={24} color="#5EA500" />
                </div>
              </div>

              <div className="text-right mt-1">
                <p className="text-[22px] font-bold text-foreground">
                  {formatCurrencyDZD(8300, i18n.language)}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  لكل عملية خلال شهر مايو
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Reports Table */}
        <ExpensesTable expenses={expensses} />
      </div>
    </div>
  );
}
