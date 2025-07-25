import { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { SearchNormal1, Document } from "iconsax-react";
import { getOverallBadge } from "@/utils/getStatusBadges";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ReportsPedagogicalModal from "./ReportsPedagogicalModal";
import api from "@/services/api";
import { toast } from "sonner";
import { formatDateTime } from "@/utils/dateFormatter";
import LoadingTable from "@/components/LoadingTable";
import ReportsFilter from "@/components/reports/ReportsFilter";
import usePaginatedFetch from "@/hooks/usePaginatedFetch";
import getPageNumbers from "@/utils/getPageNumbers";

export default function ReportsPedagogicalTable({ classes, students }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounceTimeout = useRef(null);

  const fetchReports = async ({ page = 1, search, class: classId, month }) => {
    const params = new URLSearchParams();
    params.append("page", page);
    if (search) params.append("search", search);
    if (classId) params.append("class", classId);
    if (month) params.append("month", month);

    const res = await api.get(`/pedagogical-reports?${params.toString()}`);
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
      const response = await api.post("/pedagogical-reports", data);
      setReports((prev) => [response.data, ...prev]);
      toast("تمت إضافة التقرير بنجاح!");
    } catch (error) {
      console.error("Error creating report", error);
    }
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <div className="flex justify-between mb-4">
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
              value={search}
              onChange={handleSearch}
            />
          </div>
          <ReportsFilter classes={classes} onApplyFilters={handleApplyFilter} />
        </div>
        <ReportsPedagogicalModal
          classes={classes}
          children={students}
          onAddReport={handleAddReport}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead>#</TableHead>
            <TableHead>اسم الطفل</TableHead>
            <TableHead>اسم المعلمة</TableHead>
            <TableHead>الفصل</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>التقييم العام</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>

        {loading ? (
          <TableBody>
            <LoadingTable />
          </TableBody>
        ) : reports.length > 0 ? (
          <TableBody>
            {reports.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>
                  {row.student?.firstName} {row.student?.lastName}
                </TableCell>
                <TableCell>{row.teacher?.name}</TableCell>
                <TableCell>{row.class?.className}</TableCell>
                <TableCell>{formatDateTime(row.createdAt)}</TableCell>
                <TableCell>{getOverallBadge(row.overall)}</TableCell>
                <TableCell>
                  {row.overall === "جديد" ? (
                    <Badge className="bg-primary-foreground text-[#1447e6] hover:bg-primary-foreground">
                      {row.overall}
                    </Badge>
                  ) : (
                    <span className="text-foreground">{row.overall}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Link to={`/reports/pedagogical/${row._id}`}>
                    <Button
                      variant="link"
                      className="text-primary p-0 h-auto underline"
                    >
                      عرض التفاصيل
                    </Button>
                  </Link>
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
                  <p className="text-lg font-medium">لا توجد تقارير متاحة</p>
                  <p className="text-sm">
                    لم يتم إنشاء أي تقارير بعد، قم بإضافة تقرير جديد
                  </p>
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
