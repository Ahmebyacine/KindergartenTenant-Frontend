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
import { getAssessmentBadge } from "@/utils/getStatusBadges";
import { Link } from "react-router-dom";
import ReportsHealthModal from "../../../components/reports/ReportsHealthModal";
import api from "@/services/api";
import { toast } from "sonner";
import { useState } from "react";
import { useEffect } from "react";
import { formatDateTime } from "@/utils/dateFormatter";
import i18n from "@/i18n";
import LoadingTable from "@/components/LoadingTable";
import ReportsFilter from "@/components/reports/ReportsFilter";

export default function ReportsHealthTable({ classes, students }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const response = await api.get("/health-reports");
      setReports(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handelAddReport = async (data) => {
    try {
      await api.post("/health-reports", data);
      toast("تمت إضافة التقرير بنجاح!");
    } catch (error) {
      console.error("Error creating Report:", error);
    }
  };

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
              placeholder="البحث"
              className="pr-10 pl-4 py-2 bg-background"
              disabled={!reports.length}
            />
          </div>
          <ReportsFilter />
        </div>
        <ReportsHealthModal
          onAddReport={handelAddReport}
          classes={classes}
          children={students}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-right text-foreground font-medium">
              #
            </TableHead>
            <TableHead className="text-right text-foreground font-medium">
              اسم الطفل
            </TableHead>
            <TableHead className="text-right text-foreground font-medium">
              اسم المعلمة
            </TableHead>
            <TableHead className="text-right text-foreground font-medium">
              الفصل
            </TableHead>
            <TableHead className="text-right text-foreground font-medium">
              التاريخ
            </TableHead>
            <TableHead className="text-right text-foreground font-medium">
              تقييم الحالة
            </TableHead>
            <TableHead className="text-right text-foreground font-medium">
              الحالة
            </TableHead>
            <TableHead className="text-right text-foreground font-medium">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <LoadingTable />
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
                  {formatDateTime(row.createdAt, i18n.language)}
                </TableCell>
                <TableCell className="text-right py-3">
                  {getAssessmentBadge(row.conditionAssessment)}
                </TableCell>
                <TableCell className="text-right py-3">
                  {row.conditionType}
                </TableCell>
                <TableCell className="text-right py-3">
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto underline"
                  >
                    <Link to={`/reports/health/${row._id}`}>عرض التفاصيل</Link>
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
    </>
  );
}
