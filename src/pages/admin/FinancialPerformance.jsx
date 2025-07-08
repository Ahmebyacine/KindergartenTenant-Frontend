import {
  CardReceive,
  CardSend,
  Chart2,
  DollarSquare,
  SearchNormal1,
} from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import { Input } from "@/components/ui/input";
import IncomesFilter from "@/layouts/admin/incomes/IncomesFilter";
import FinancialJournalChart from "@/layouts/admin/financialPerformance/FinancialJournalChart";
import FinancialJournalTable from "@/layouts/admin/financialPerformance/FInancialJournalTable";
import EmployeeJournalTable from "@/layouts/admin/financialPerformance/EmployeeJournalTable";
import StatCard from "@/components/StatCard";

const statsData = [
  {
    title: "إجمالي المداخيل",
    value: formatCurrencyDZD(125000),
    subLabel: "المبلغ المحصل خلال السنة الحالية",
    icon: CardReceive,
    bgColor: "bg-[#DCFCE7]",
    iconColor: "#00A63E",
  },
  {
    title: "إجمالي المصاريف",
    value: formatCurrencyDZD(50000),
    icon: CardSend,
    bgColor: "bg-[#FFE2E2]",
    iconColor: "#FB2C36",
    subLabel: "جميع المصاريف المسجلة",
  },
  {
    title: "صافي الربح",
    value: "+" + formatCurrencyDZD(970000 - 50000),
    icon: DollarSquare,
    bgColor: "bg-[#FEF3C6]",
    iconColor: "#D08700",
    subLabel: "الفرق بين المداخيل والمصاريف",
  },
  {
    title: "نسبة الربح",
    value: "88%",
    icon: Chart2,
    bgColor: "bg-[#DBEAFE]",
    iconColor: "#1447E6",
    subLabel: "مقارنة بين الربح والمصاريف الإجمالية",
  },
];

export default function FinancialPerformance() {
  const chartData = [
    { month: "ديسمبر", المصاريف: 70000, المداخيل: 50000 },
    { month: "نوفمبر", المصاريف: 25000, المداخيل: 55000 },
    { month: "أكتوبر", المصاريف: 35000, المداخيل: 40000 },
    { month: "سبتمبر", المصاريف: 30000, المداخيل: 85000 },
    { month: "أغسطس", المصاريف: 40000, المداخيل: 20000 },
    { month: "يوليو", المصاريف: 15000, المداخيل: 18000 },
    { month: "يونيو", المصاريف: 60000, المداخيل: 58000 },
    { month: "مايو", المصاريف: 18000, المداخيل: 35000 },
    { month: "أبريل", المصاريف: 58000, المداخيل: 95000 },
    { month: "مارس", المصاريف: 55000, المداخيل: 92000 },
    { month: "فبراير", المصاريف: 88000, المداخيل: 58000 },
    { month: "يوليو", المصاريف: 42000, المداخيل: 18000 },
  ];
  const tableData = [
    {
      month: "جانفي",
      year: "2024-2025",
      income: 1500000,
      expenses: 900000,
      surplus: 600000,
      profitRate: "40%",
    },
    {
      month: "فيفري",
      year: "2024-2025",
      income: 1500000,
      expenses: 900000,
      surplus: 600000,
      profitRate: "40%",
    },
    {
      month: "مارس",
      year: "2024-2025",
      income: 1500000,
      expenses: 900000,
      surplus: 600000,
      profitRate: "40%",
    },
    {
      month: "أبريل",
      year: "2024-2025",
      income: 1500000,
      expenses: 900000,
      surplus: 600000,
      profitRate: "40%",
    },
    {
      month: "ماي",
      year: "2024-2025",
      income: 1500000,
      expenses: 900000,
      surplus: 600000,
      profitRate: "40%",
    },
    {
      month: "جوان",
      year: "2024-2025",
      income: 1500000,
      expenses: 900000,
      surplus: 600000,
      profitRate: "40%",
    },
    {
      month: "جويلية",
      year: "2024-2025",
      income: 1500000,
      expenses: 900000,
      surplus: 600000,
      profitRate: "40%",
    },
  ];
  const employeeData = [
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
    {
      employee: "م نوال",
      year: "2024-2025",
      month: "جانفي",
      operations: "18",
      amount: 540000,
      notes: "تقف مراجعة البيانات",
    },
  ];

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
        {/* filter search and tables */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <SearchNormal1
                size="16"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                color="currentColor"
              />
              <Input
                placeholder="البحث"
                className="pr-10 pl-4 py-2 bg-background"
                //disabled={!expenses.length}
              />
            </div>
            <IncomesFilter />
          </div>
        </div>
        <FinancialJournalChart data={chartData} />
        <FinancialJournalTable data={tableData} />
        <EmployeeJournalTable data={employeeData} />
      </div>
    </div>
  );
}
