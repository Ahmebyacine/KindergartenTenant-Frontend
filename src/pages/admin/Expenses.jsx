import { useRef, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import api from "@/api";
import { toast } from "sonner";
import ExpensesFilter from "@/layouts/admin/expenses/ExpensesFilter";
import ExpensesModal from "@/layouts/admin/expenses/ExpensesModal";
import { Input } from "@/components/ui/input";
import { getMonthNameByNumber } from "@/utils/getMonthNameByNumber";
import useFetch from "@/hooks/useFetch";
import usePaginatedFetch from "@/hooks/usePaginatedFetch";
import getPageNumbers from "@/utils/getPageNumbers";
import ErrorPage from "../common/ErrorPage";
import { t } from "i18next";

export default function Expenses() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounceTimeout = useRef(null);

  const fetchExpenses = async (filters = {}) => {
    const params = new URLSearchParams();
    params.append("page", page);
    if (filters.type) params.append("category", filters.type);
    if (filters.month) params.append("month", filters.month);
    if (filters.search) params.append("search", filters.search);

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
    page: actualPage,
    pages,
    refetch: refetchExpenses,
    error: errorExpenses,
  } = usePaginatedFetch(() => fetchExpenses({ page }));

  const {
    data: expensesStatistics,
    loading: loadingStatistics,
    refetch: refetchStatistics,
    error: errorStatistics,
  } = useFetch(() => fetchExpensesStatistics());

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetchExpenses(() => fetchExpenses({ page: newPage }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      refetchExpenses(() => fetchExpenses({ page: 1, search: value }));
    }, 700);
  };

  const handleAddExpense = async (data) => {
    try {
      const response = await api.post("/expenses", data);
      setExpenses((prev) => [response.data, ...prev]);
      refetchStatistics(fetchExpensesStatistics);
      toast.success(t("expenses.add.success"));
    } catch (error) {
      console.error("Error creating expense", error);
      toast.error(
        t(`errorApi.${error?.response?.data?.message || "defaultError"}`)
      );
    }
  };

  const handleUpdateExpenses = async (data) => {
    try {
      const response = await api.put(`/expenses/${data._id}`, data);

      setExpenses((prev) =>
        prev.map((item) => (item._id === data._id ? response.data : item))
      );
      refetchStatistics && refetchStatistics(() => fetchExpensesStatistics());
      toast.success(t("expenses.update.success"));
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        t(`errorApi.${error?.response?.data?.message || "defaultError"}`)
      );
    }
  };

  const handleDeleteExpenses = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
      refetchStatistics && refetchStatistics(() => fetchExpensesStatistics());
      toast.success(t("expenses.delete.success"));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(
        t(`errorApi.${error?.response?.data?.message || "defaultError"}`)
      );
    }
  };

  const handleApplyFilter = (type, month) => {
    refetchExpenses(() =>
      fetchExpenses({
        type,
        month,
      })
    );
    refetchStatistics(() => fetchExpensesStatistics({ month }));
  };

  // Translatable stats
  const stats = [
    {
      title: t("expenses.stats.month.title"),
      value: formatCurrencyDZD(expensesStatistics?.totalMonth || 0),
      subLabel: t("expenses.stats.month.subLabel", {
        month: t(getMonthNameByNumber(expensesStatistics?.month || 0)),
      }),
      icon: Calendar,
      iconColor: "var(--primary)",
      bgColor: "bg-[#EDE9FE]",
    },
    {
      title: t("expenses.stats.year.title"),
      value: formatCurrencyDZD(expensesStatistics?.totalYear || 0),
      subLabel: t("expenses.stats.year.subLabel"),
      icon: DollarSquare,
      iconColor: "#1447E6",
      bgColor: "bg-[#DBEAFE]",
    },
    {
      title: t("expenses.stats.count.title"),
      value: `${expensesStatistics?.operationCount || 0} ${t(
        "expenses.stats.count.unit"
      )}`,
      subLabel: t("expenses.stats.count.subLabel", {
        month: t(getMonthNameByNumber(expensesStatistics?.month || 0)),
      }),
      icon: MoneyArchive,
      iconColor: "#E17100",
      bgColor: "bg-[#FEF3C6]",
    },
    {
      title: t("expenses.stats.average.title"),
      value: formatCurrencyDZD(
        Math.round(
          expensesStatistics?.totalMonth / expensesStatistics?.operationCount
        ) || 0
      ),
      subLabel: t("expenses.stats.average.subLabel", {
        month: t(getMonthNameByNumber(expensesStatistics?.month || 0)),
      }),
      icon: CardIcon,
      iconColor: "#5EA500",
      bgColor: "bg-[#ECFCCA]",
    },
  ];

  if (errorExpenses) return <ErrorPage error={errorExpenses} />;

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingStatistics || errorStatistics
            ? Array(4)
                .fill(null)
                .map((_, idx) => (
                  <StatCard
                    key={idx}
                    loading={loadingStatistics}
                    error={errorStatistics}
                  />
                ))
            : stats.map((stat, idx) => <StatCard key={idx} stat={stat} />)}
        </div>

        {/* Search & Filters */}
        <div className="flex justify-between items-center">
          <div className="w-2/3 md:w-full flex gap-1 items-center">
            <div className="relative w-2/3 md:w-1/3">
              <SearchNormal1
                size="16"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                color="currentColor"
              />
              <Input
                placeholder={t("common.search")}
                className="pr-10 pl-4 py-2 bg-background"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <ExpensesFilter onApplyFilters={handleApplyFilter} />
          </div>
          <ExpensesModal onAddExpense={handleAddExpense} />
        </div>

        {/* Table */}
        <ExpensesTable
          expenses={expenses}
          loading={loading}
          handleUpdateExpenses={handleUpdateExpenses}
          handleDeleteExpenses={handleDeleteExpenses}
        />

        {/* Pagination */}
        {pages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, actualPage - 1))}
                  className={
                    actualPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers(actualPage, pages).map((p, idx) => (
                <PaginationItem key={idx}>
                  {p === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(p)}
                      isActive={loading ? page === p : actualPage === p}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(pages, actualPage + 1))
                  }
                  className={
                    actualPage === pages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
