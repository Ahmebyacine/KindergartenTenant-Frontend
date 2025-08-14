import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Document } from "iconsax-react";
import { formatDateTime } from "@/utils/dateFormatter";
import LoadingTable from "@/components/LoadingTable";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { getAttendancesBadge } from "@/utils/getStatusBadges";
import { isSameDay } from "@/utils/isSameDay";

export default function AttendanceTable({
  loading,
  attendance,
  onAttendanceCreate,
  onAttendanceCheckOut,
  selectedDate,
}) {
  const [studentsSelection, setStudentsSelection] = useState([]);

  const today = new Date();

  const onCheckIn = async (ids) => {
    if (!ids) {
      toast.dismiss("يرجى تحديد الطلاب لتسجيل الحضور");
      return;
    }
    const data = {
      ids,
      status: "present",
    };

    await onAttendanceCreate(data);

    if (Array.isArray(data.ids) && data.ids.length > 0) {
      setStudentsSelection([]);
    }
  };
  const onCheckOut = async (ids) => {
    // Call the API or perform the action to check in the selected students
    await onAttendanceCheckOut(ids);

    if (Array.isArray(ids) && ids.length > 0) {
      setStudentsSelection([]);
    }
  };
  const onCheckLate = async (ids) => {
    if (!ids) {
      toast.dismiss("يرجى تحديد الطلاب لتسجيل المتأخرين");
      return;
    }
    const data = {
      ids,
      status: "late",
    };
    await onAttendanceCreate(data);

    if (Array.isArray(data.ids) && data.ids.length > 0) {
      setStudentsSelection([]);
    }
  };
  const onAbsent = async (ids) => {
    if (!ids) {
      toast.dismiss("يرجى تحديد الطلاب لتسجيل الغياب");
      return;
    }
    const data = {
      ids,
      status: "absent",
    };
    await onAttendanceCreate(data);
    if (Array.isArray(data.ids) && data.ids.length > 0) {
      setStudentsSelection([]);
    }
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
            <TableHead className="text-muted-foreground font-medium h-12">
              <Checkbox
                className="mr-4"
                checked={
                  attendance?.length > 0 &&
                  attendance.every((att) =>
                    studentsSelection.includes(att.enrollmentId)
                  )
                }
                indeterminate={
                  attendance?.some((att) =>
                    studentsSelection.includes(att.enrollmentId)
                  ) &&
                  !attendance.every((att) =>
                    studentsSelection.includes(att.enrollmentId)
                  )
                }
                onCheckedChange={(checked) => {
                  const ids = attendance?.map((att) => att.enrollmentId) || [];
                  setStudentsSelection((prev) =>
                    checked
                      ? [...new Set([...prev, ...ids])]
                      : prev.filter((id) => !ids.includes(id))
                  );
                }}
              />
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium h-12">
              #
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              اسم الطفل
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              الفصل
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              الحالة
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              توقيت الدخول
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              توقيت الخروج
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              الملاحظات
            </TableHead>
            <TableHead className="text-right text-muted-foreground font-medium">
              الاجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <TableBody>
            <LoadingTable />
          </TableBody>
        ) : attendance?.length > 0 ? (
          <TableBody>
            {attendance?.map((att, i) => (
              <TableRow
                key={i}
                className="border-b border-border hover:bg-muted/50 data-[state=selected]:bg-primary/10 data-[state=selected]:text-primary-foreground"
                data-state={
                  studentsSelection.includes(att.enrollmentId) && "selected"
                }
              >
                <TableCell className="text-foreground py-3">
                  <Checkbox
                    className="mr-4"
                    checked={studentsSelection.includes(att.enrollmentId)}
                    onCheckedChange={(checked) => {
                      setStudentsSelection((prev) => {
                        if (checked) {
                          return [...prev, att.enrollmentId];
                        } else {
                          return prev.filter((id) => id !== att.enrollmentId);
                        }
                      });
                    }}
                    readOnly
                  />
                </TableCell>
                <TableCell className="text-foreground py-3">{i + 1}</TableCell>
                <TableCell
                  className="text-foreground font-medium py-3 cursor-pointer hover:underline"
                  onClick={() => {
                    setStudentsSelection((prev) =>
                      prev.includes(att.enrollmentId)
                        ? prev.filter((id) => id !== att.enrollmentId)
                        : [...prev, att.enrollmentId]
                    );
                  }}
                >
                  {att?.student?.name}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {att?.class?.name}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {getAttendancesBadge(att?.status)}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {att?.checkInTime
                    ? formatDateTime(att?.checkInTime)
                    : "--"}
                </TableCell>
                <TableCell className="text-foreground py-3">
                  {att?.checkOutTime
                    ? formatDateTime(att?.checkOutTime)
                    : "--"}
                </TableCell>
                <TableCell className="py-3">
                  {att?.notes || "لا توجد ملاحظات"}
                </TableCell>
                <TableCell className="py-3">
                  {isSameDay(selectedDate, today) ? (
                    !att.status ? (
                      <Button
                        size="sm"
                        className="bg-green-100 text-green-700"
                        variant="outline"
                        onClick={() => onCheckIn(att.enrollmentId)}
                      >
                        تسجيل الحضور
                      </Button>
                    ) : att.checkOutTime || att.status === "absent" ? (
                      <Button variant="link" size="sm">
                        تعديل
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#ffe2e2] text-[#c10007]"
                        onClick={() => onCheckOut(att.enrollmentId)}
                      >
                        تسجيل الخروج
                      </Button>
                    )
                  ) : (
                    <Button variant="link" size="sm">
                      تعديل
                    </Button>
                  )}
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
                    لا توجد بيانات الحضور والغياب متاحة
                  </p>
                  <p className="text-sm">
                    لم يتم إنشاء أي بيانات الحضور والغياب بعد
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      {studentsSelection.length > 0 && (
        <>
          <div className="bg-card fixed bottom-5 border-2 border-border shadow-lg rounded-4xl w-3/4 right-[12.5%] md:w-1/2 md:right-[25%]">
            <div className="container mx-auto px-10 py-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left side - Status or info */}
                <div className="flex items-center gap-2 text-sm text-foreground ">
                  <span>تم تحديد {studentsSelection.length} عناصر</span>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center gap-3">
                  {isSameDay(selectedDate, today) && (
                    <>
                      <Button
                        size="sm"
                        className="text-green-700"
                        variant={"ghost"}
                        onClick={() => onCheckIn(studentsSelection)}
                      >
                        <Check className="w-4 h-4" />
                        حاضر
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={"text-amber-500"}
                        onClick={() => onCheckLate(studentsSelection)}
                      >
                        متأخر
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={"text-destructive"}
                        onClick={() => onAbsent(studentsSelection)}
                      >
                        <X className="w-4 h-4" />
                        غائب
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStudentsSelection([])}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
