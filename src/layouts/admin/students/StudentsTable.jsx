import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ProfileDelete, Trash } from "iconsax-react";
import { formatDate } from "@/utils/dateFormatter";
import i18n from "@/i18n";
import LoadingTable from "@/components/LoadingTable";
import { useState } from "react";
import { X } from "lucide-react";

export default function StudentsTable({ loading, students }) {
  const [rowSelection, setRowSelection] = useState([]);

  console.log(rowSelection);

  const groupedByClass = students.reduce((groups, enrollment) => {
    const classId = enrollment.class._id;
    if (!groups[classId]) {
      groups[classId] = {
        className: enrollment.class.className,
        enrollments: [],
      };
    }
    groups[classId].enrollments.push(enrollment);
    return groups;
  }, {});

  const classGroups = Object.values(groupedByClass).sort((a, b) =>
    a.className.localeCompare(b.className)
  );

  if (loading) {
    return (
      <Table>
        <TableBody>
          <LoadingTable />
        </TableBody>
      </Table>
    );
  }

  if (students.length === 0) {
    return (
      <Card className="border border-border shadow-sm">
        <Table>
          <TableHeader />
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-12 text-muted-foreground"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <ProfileDelete size={40} color="CurrentColor" />
                  <p className="text-lg font-medium">لا يوجد اطفال متاحون</p>
                  <p className="text-sm">
                    لم يتم تسجيل أي طفل بعد، قم بإضافة طفل جديد
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {classGroups.map((classGroup) => (
        <Card
          key={classGroup.className}
          className="border border-border shadow-sm px-4"
        >
          <CardHeader>
            <h3 className="text-lg font-semibold text-foreground">
              {classGroup.className}
            </h3>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-b border-border hover:bg-muted/50">
                <TableHead className="text-muted-foreground font-medium h-12">
                  <Checkbox
                    checked={
                      classGroup.enrollments.length > 0 &&
                      classGroup.enrollments.every((e) =>
                        rowSelection.includes(e._id)
                      )
                    }
                    indeterminate={
                      classGroup.enrollments.some((e) =>
                        rowSelection.includes(e._id)
                      ) &&
                      !classGroup.enrollments.every((e) =>
                        rowSelection.includes(e._id)
                      )
                    }
                    onCheckedChange={(checked) => {
                      const ids = classGroup.enrollments.map((e) => e._id);
                      setRowSelection((prev) =>
                        checked
                          ? [...new Set([...prev, ...ids])]
                          : prev.filter((id) => !ids.includes(id))
                      );
                    }}
                  />
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  #
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  اسم الطفل
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  ولي الامر
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  رقم التواصل
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  تاريخ التسجيل
                </TableHead>
                <TableHead className="text-muted-foreground font-medium">
                  الإجراءات
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {classGroup.enrollments.map((enrollment, i) => (
                <TableRow
                  key={enrollment._id}
                  onClick={() => {
                    setRowSelection(
                      (prev) =>
                        prev.includes(enrollment._id)
                          ? prev.filter((id) => id !== enrollment._id)
                          : [...prev, enrollment._id]
                    );
                  }}
                  className="border-b border-border hover:bg-muted/50"
                  data-state={rowSelection[enrollment._id] && "selected"}
                >
                  <TableCell className="text-foreground py-3">
                    <Checkbox
                      checked={rowSelection.includes(enrollment._id)}
                      onCheckedChange={(checked) => {
                        setRowSelection((prev) => {
                          if (checked) {
                            return [...prev, enrollment._id];
                          } else {
                            return prev.filter((id) => id !== enrollment._id);
                          }
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {i + 1}
                  </TableCell>
                  <TableCell className="text-foreground font-medium py-3">
                    {enrollment.student.firstName} {enrollment.student.lastName}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {enrollment.student.parents?.name}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {enrollment.student.parents?.contact}
                  </TableCell>
                  <TableCell className="text-foreground py-3">
                    {formatDate(enrollment.createdAt, i18n.language)}
                  </TableCell>
                  <TableCell className="py-3">
                    <Button
                      variant="link"
                      className="text-primary hover:text-primary/80 p-0 h-auto underline"
                    >
                      {enrollment.actions}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ))}
      {rowSelection.length > 0 && (
        <>
          <div className="fixed bottom-5 border-2 border-border shadow-lg rounded-4xl w-[50%] right-[25%]">
            <div className="container mx-auto px-10 py-2">
              <div className="flex items-center justify-between gap-4">
                {/* Left side - Status or info */}
                <div className="flex items-center gap-2 text-sm text-foreground ">
                  <span>تم تحديد {rowSelection.length} عناصر</span>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center gap-3">
                  <Button size="sm" className="text-primary" variant={"ghost"}>
                    طباعة البطاقات
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={"text-[#fb2c36] hover:text-[#dc2626]"}
                  >
                    <Trash color="currentColor" />
                    حذف
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRowSelection([])}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
