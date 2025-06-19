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
import { Card } from "@/components/ui/card";
import { SearchNormal1, Document } from "iconsax-react";
import { getStatusPayBadge } from "@/utils/getStatusBadge";
import { Link } from "react-router-dom";
import ReportsFinancialModal from "./ReportsFinancialModal";
import { toast } from "sonner";
import api from "@/services/api";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrencyDZD } from "@/utils/currencyFormatter";
import i18n from "@/i18n";
import { formatDateMonth } from "@/utils/dateFormatter";
import LoadingTable from "@/components/LoadingTable";

export default function ReportsFinancialTable({ classes, students }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchReport = async () => {
    try {
      const response = await api.get("/financial-reports");
      setReports(response.data.data);
      console.log(response.data.data);
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
      await api.post("/financial-reports", data);
      toast("تمت إضافة التقرير بنجاح!");
    } catch (error) {
      console.error("Error creating class", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="relative">
          <SearchNormal1
            size="16"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            color="currentColor"
          />
          <Input
            placeholder="البحث"
            className="pr-10 pl-4 py-2 w-64 border border-border rounded-lg text-right bg-background"
            disabled={!reports.length}
          />
        </div>

        <ReportsFinancialModal
          onAddReport={handelAddReport}
          classes={classes}
          children={students}
        />
      </div>

      <Card className="border border-border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground font-medium h-12">
                #
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                الطفل
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                ولي الأمر
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                الفصل
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                الشهر
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                المبلغ
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                الحالة
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                الإجراءات
              </TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <LoadingTable />
          ) : reports.length > 0 ? (
            <TableBody>
              {reports.map((report, i) => (
                <TableRow
                  key={report._id}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell className="text-foreground py-3">
                    {i + 1}
                  </TableCell>
                  <TableCell className="text-foreground font-medium py-3">
                    {report.student?.firstName} {report.student?.lastName}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {report.student?.parents?.name}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {report.class?.className}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {formatDateMonth(report.month, i18n.language)}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {formatCurrencyDZD(report.amount, i18n.language)}
                  </TableCell>
                  <TableCell className="py-3">
                    {getStatusPayBadge(report.status)}
                  </TableCell>
                  <TableCell className="py-3">
                    <Button
                      variant="link"
                      className="text-primary hover:text-primary/80 p-0 h-auto underline"
                    >
                      <Link to={`/reports/financial/${report._id}`}>
                        التفاصيل
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
      </Card>
    </>
  );
}
