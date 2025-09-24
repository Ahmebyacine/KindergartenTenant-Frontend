import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchNormal1, Document } from "iconsax-react";
import { getAssessmentBadge, getConditionBadge } from "@/utils/getStatusBadges";
import { Link } from "react-router-dom";
import ReportsHealthModal from "./ReportsHealthModal";
import api from "@/api";
import { toast } from "sonner";
import { formatDateTime } from "@/utils/dateFormatter";
import LoadingTable from "@/components/LoadingTable";
import ReportsFilter from "@/components/reports/ReportsFilter";
import { useRef, useState } from "react";
import usePaginatedFetch from "@/hooks/usePaginatedFetch";
import getPageNumbers from "@/utils/getPageNumbers";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ErrorPage from "@/pages/common/ErrorPage";
import { t } from "i18next";

export default function ReportsHealthTable({ classes, students }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounceTimeout = useRef(null);

  const fetchReports = async ({ page = 1, search, class: classId, month }) => {
    const params = new URLSearchParams();
    params.append("page", page);
    if (search) params.append("search", search);
    if (classId) params.append("class", classId);
    if (month) params.append("month", month);

    const res = await api.get(`/health-reports?${params.toString()}`);
    return res.data;
  };
  const {
    data: reports,
    setData: setReports,
    loading,
    page: actualPage,
    pages,
    refetch,
    error,
  } = usePaginatedFetch(() => fetchReports({ page: page }));

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch(() => fetchReports({ page: newPage }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      refetch(() => fetchReports({ page: 1, search: value }));
    }, 700);
  };

  const handleApplyFilter = (selectedClass, selectedMonth) => {
    refetch(() =>
      fetchReports({
        page: 1,
        class: selectedClass,
        month: selectedMonth,
        search,
      })
    );
  };

  const handleAddReport = async (data) => {
    try {
      const response = await api.post("/health-reports", data);
      setReports((prev) => [response.data, ...prev]);
      toast.success(t("reports.health.addSuccess"));
    } catch (error) {
      console.error("Error creating class", error);
      toast.error(t("reports.health.addError"), {
        description: t(
          `errorApi.${error.response?.data?.error || "defaultError"}`
        ),
      });
    }
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <div className="flex justify-between ">
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
              onChange={handleSearch}
              value={search}
            />
          </div>
          <ReportsFilter classes={classes} onApplyFilters={handleApplyFilter} />
        </div>
        <ReportsHealthModal
          onAddReport={handleAddReport}
          classes={classes}
          children={students}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-muted-foreground font-medium !text-center">
              #
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("reports.health.childName")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("reports.health.teacherName")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("reports.health.class")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("reports.health.date")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("reports.health.conditionType")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("reports.health.conditionStatus")}
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              {t("common.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableBody>
            <LoadingTable />
          </TableBody>
        ) : reports.length > 0 ? (
          <TableBody>
            {reports.map((row, index) => (
              <TableRow
                key={row._id}
                className="border-b border-border hover:bg-muted/50"
              >
                <TableCell className="text-right text-foreground py-3">
                  {index + 1}
                </TableCell>
                <TableCell className="text-right text-foreground font-medium py-3">
                  {row.student?.firstName} {row.student?.lastName}
                </TableCell>
                <TableCell className="text-right text-foreground py-3">
                  {row.generatedBy?.name}
                </TableCell>
                <TableCell className="text-right text-foreground py-3">
                  {row.class?.className}
                </TableCell>
                <TableCell className="text-right text-foreground py-3">
                  {formatDateTime(row.createdAt)}
                </TableCell>
                <TableCell className="text-right py-3">
                  {getAssessmentBadge(row.conditionAssessment)}
                </TableCell>
                <TableCell className="text-right py-3">
                  {getConditionBadge(row.conditionType)}
                </TableCell>
                <TableCell className="text-right py-3">
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto underline"
                  >
                    <Link to={`/reports/health/${row._id}`}>
                      {t("common.details")}
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-12 text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Document size={40} color="CurrentColor" />
                  <p className="text-lg font-medium">
                    {t("reports.noReports")}
                  </p>
                  <p className="text-sm">{t("reports.noReportsDescription")}</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      {/* Pagination Controls */}
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
    </>
  );
}
