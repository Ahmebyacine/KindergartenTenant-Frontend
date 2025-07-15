import {
  Calendar,
  Card as CardIcon,
  DollarSquare,
  MoneyArchive,
  SearchNormal1,
} from "iconsax-react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import ExpensesTable from "@/layouts/admin/expenses/ExpensesTable";
import StatCard from "@/components/StatCard";
import api from "@/services/api";
import { toast } from "sonner";
import ExpensesFilter from "@/layouts/admin/expenses/ExpensesFilter";
import ExpensesModal from "@/layouts/admin/expenses/ExpensesModal";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import useFetchParams from "@/hooks/useFetchParams";

export default function Expenses() {
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchExpenses = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.type) params.append("category", filters.type);
    if (filters.month) params.append("month", filters.month);

    const res = await api.get(`/expenses?${params.toString()}`);
    return res.data;
  };

  const fetchExpensesStatistics = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.month) params.append("month", filters.month);
    const res = await api.get(`/expenses/statistics?${params.toString()}`);
    return res.data;
  };

  const {
    data: expenses,
    setData: setExpenses,
    loading,
    refetch: refetchExpenses,
  } = useFetchParams(() =>
    fetchExpenses({ type: selectedExpenseType, month: selectedMonth })
  );
  const {
    data: expensesStatistics,
    loading: loadingStatistics,
    refetch: refetchStatistics,
  } = useFetchParams(() => fetchExpensesStatistics({ month: selectedMonth }));

  const handleAddExpense = async (data) => {
    try {
      const response = await api.post("/expenses", data);
      setExpenses((prev) => ({
        ...prev,
        count: prev.count + 1,
        data: [...prev.data, response.data],
      }));
      refetchStatistics &&
        refetchStatistics(() =>
          fetchExpensesStatistics({ month: selectedMonth })
        );
      toast.success("تمت إضافة المصروف بنجاح!");
    } catch (error) {
      console.error("Error creating class", error);
    }
  };

  const handleUpdateExpenses = async (data) => {
    try {
      const response = await api.put(`/expenses/${data._id}`, data);

      setExpenses((prev) => ({
        ...prev,
        data: prev.data.map((item) =>
          item._id === data._id ? response.data : item
        ),
      }));
      refetchStatistics &&
        refetchStatistics(() =>
          fetchExpensesStatistics({ month: selectedMonth })
        );
      toast.success("تم التحديث بنجاح");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const handleApllyFilter = (
    type = selectedExpenseType,
    month = selectedMonth
  ) => {
    setSelectedExpenseType(type);
    setSelectedMonth(month);
    refetchExpenses(() =>
      fetchExpenses({
        type,
        month,
      })
    );
    refetchStatistics(() => fetchExpensesStatistics({ month }));
  };

  // Card data as JSON array
  const stats = [
    {
      title: "مصاريف هذا الشهر",
      value: formatCurrencyDZD(expensesStatistics?.totalMonth || 0),
      subLabel: `إجمالي المصاريف لشهر ${getMonthNameByNumber(
        expensesStatistics?.month || 0
      )}`,
      icon: Calendar,
      iconColor: "var(--primary)",
      bgColor: "bg-[#EDE9FE]",
    },
    {
      title: "مصاريف السنة الحالية",
      value: formatCurrencyDZD(expensesStatistics?.totalYear || 0),
      subLabel: "منذ يناير حتى اليوم",
      icon: DollarSquare,
      iconColor: "#1447E6",
      bgColor: "bg-[#DBEAFE]",
    },
    {
      title: "عدد المصاريف المسجلة",
      value: `${expensesStatistics?.operationCount || 0} عملية`,
      subLabel: `خلال شهر ${getMonthNameByNumber(
        expensesStatistics?.month || 0
      )} فقط`,
      icon: MoneyArchive,
      iconColor: "#E17100",
      bgColor: "bg-[#FEF3C6]",
    },
    {
      title: "متوسط المصروف",
      value: formatCurrencyDZD(
        Math.round(
          expensesStatistics?.totalMonth / expensesStatistics?.operationCount
        ) || 0
      ),
      subLabel: `لكل عملية خلال شهر ${getMonthNameByNumber(
        expensesStatistics?.month || 0
      )}`,
      icon: CardIcon,
      iconColor: "#5EA500",
      bgColor: "bg-[#ECFCCA]",
    },
  ];

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingStatistics
            ? Array(4)
                .fill(null)
                .map((_, idx) => <StatCard key={idx} loading={true} />)
            : stats.map((stat, idx) => <StatCard key={idx} stat={stat} />)}
        </div>
        {/* search and add expenses secion */}
        <div className="flex justify-between items-center">
          <div className="w-2/3 md:w-full flex gap-1 items-center">
            <div className="relative w-2/3 md:w-1/3">
              <SearchNormal1
                size="16"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                color="currentColor"
              />
              <Input
                placeholder="البحث"
                className="pr-10 pl-4 py-2 bg-background"
                disabled={!expenses?.data?.length}
              />
            </div>
            <ExpensesFilter
              selectedExpenseType={selectedExpenseType}
              selectedMonth={selectedMonth}
              setSelectedExpenseType={setSelectedExpenseType}
              setSelectedMonth={setSelectedMonth}
              onApplyFilters={handleApllyFilter}
            />
          </div>
          <ExpensesModal onAddExpense={handleAddExpense} />
        </div>

        {/* Reports Table */}
        <ExpensesTable
          expenses={expenses?.data}
          loading={loading}
          handleUpdateExpenses={handleUpdateExpenses}
        />
      </div>
    </div>
  );
}
