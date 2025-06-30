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
import StatCard from "@/components/StatCard";

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

  // Card data as JSON array
  const stats = [
    {
      title: "مصاريف هذا الشهر",
      value: formatCurrencyDZD(125000, i18n.language),
      subLabel: "إجمالي المصاريف لشهر مايو",
      icon: Calendar,
      iconColor: "var(--primary)",
      bgColor: "bg-[#EDE9FE]",
    },
    {
      title: "مصاريف السنة الحالية",
      value: formatCurrencyDZD(8300000, i18n.language),
      subLabel: "منذ يناير حتى اليوم",
      icon:DollarSquare,
      iconColor:"#1447E6",
      bgColor: "bg-[#DBEAFE]",
    },
    {
      title: "عدد المصاريف المسجلة",
      value: "24 عملية",
      subLabel: "خلال شهر مايو فقط",
      icon: MoneyArchive,
      iconColor:"#E17100",
      bgColor: "bg-[#FEF3C6]",
    },
    {
      title: "متوسط المصروف",
      value: formatCurrencyDZD(8300, i18n.language),
      subLabel: "لكل عملية خلال شهر مايو",
      icon: CardIcon,
      iconColor:"#5EA500",
      bgColor: "bg-[#ECFCCA]",
    },
  ];

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              stat={stat}
            />
          ))}
        </div>
        {/* Reports Table */}
        <ExpensesTable expenses={expensses} />
      </div>
    </div>
  );
}
