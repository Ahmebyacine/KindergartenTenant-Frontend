import { Archive, CardReceive, Chart2, TickSquare } from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import IncomesTable from "@/layouts/admin/incomes/IncomesTable";
import StatCard from "@/components/StatCard";
import api from "@/services/api";
import useFetch from "@/hooks/useFetch";

export default function Incomes() {
  const fetchIncome = async () => {
    const res = await api.get(`/financial-reports/summary`);
    return res.data;
  };

  const { data } = useFetch(fetchIncome)
  console.log(data)
  const tableData = [
    {
      month: "جانفي",
      schoolYear: "2023-2024",
      invoiceCount: 12,
      totalAmount: 120000,
      averageInvoice: 10000,
      collectionRate: "85%",
      monthlyComparison: "+5%",
    },
    {
      month: "فيفري",
      schoolYear: "2023-2024",
      invoiceCount: 9,
      totalAmount: 90000,
      averageInvoice: 108000,
      collectionRate: "78%",
      monthlyComparison: "-2%",
    },
    {
      month: "مارس",
      schoolYear: "2023-2024",
      invoiceCount: 15,
      totalAmount: 150000,
      averageInvoice: 10000,
      collectionRate: "92%",
      monthlyComparison: "+10%",
    },
    {
      month: "أفريل",
      schoolYear: "2023-2024",
      invoiceCount: 7,
      totalAmount: 70000,
      averageInvoice: 10000,
      collectionRate: "60%",
      monthlyComparison: "-8%",
    },
  ];
  const stats = [
    {
      title: "إجمالي المداخيل",
      value: formatCurrencyDZD(125000),
      subLabel: "المبلغ المحصل خلال السنة الحالية",
      icon: CardReceive,
      bgColor: "bg-[#DCFCE7]",
      iconColor: "#00A63E",
    },
    {
      title: "عدد المسددين",
      value: "22 ولي",
      icon: TickSquare,
      bgColor: "bg-[#EDE9FE]",
      iconColor: "#7008E7",
      subLabel: "عدد أولياء الأمور الذين أتموا الدفع كليًا",
    },
    {
      title: "عدد الفواتير",
      value: "350 فاتورة",
      icon: Archive,
      bgColor: "bg-[#FEF3C6]",
      iconColor: "#E17100",
      subLabel: "إجمالي الفواتير الصادرة لجميع الفصول",
    },
    {
      title: "نسبة التحصيل",
      value: "88%",
      icon: Chart2,
      bgColor: "bg-[#DBEAFE]",
      iconColor: "#1447E6",
      subLabel: "نسبة ما تم تحصيله من مجموع الرسوم",
    },
  ];
  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
        {/* Reports Table */}
        <IncomesTable incomes={tableData} />
      </div>
    </div>
  );
}
