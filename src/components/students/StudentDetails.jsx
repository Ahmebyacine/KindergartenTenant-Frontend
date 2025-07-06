import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StudentCard from "./StudentCard";
import i18n from "@/i18n";
import { formatDate } from "@/utils/dateFormatter";
import { getAge } from "@/utils/getLocalizedAge";
import StudentsModal from "./StudentsModal";

export default function StudentDetails({ enrollment, classes, onUpdateStudent }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleShowCard = () => {
    setIsDetailsOpen(false);
    setIsCardOpen(true);
  };
  return (
    <>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="text-primary hover:text-primary/80 p-0 h-auto underline"
          >
            عرض تفاصيل
          </Button>
        </DialogTrigger>
        <DialogContent className="px-0 gap-0">
          {/* Header */}
          <DialogHeader className="border-b border-border px-5">
            <DialogTitle className={"rtl:text-right"}>تفاصيل الطفل</DialogTitle>
          </DialogHeader>

          {/* Content */}
          <div className="py-6 px-8 space-y-8">
            <div className="flex justify-end m-0">
              <StudentsModal editingStudent={enrollment} classes={classes} onUpdateStudent={onUpdateStudent} />
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">
                    الاسم الكامل
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {enrollment.student.firstName} {enrollment.student.lastName}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">
                    تاريخ الميلاد
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(enrollment.student.birthDate, i18n.language)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">العمر</div>
                  <div className="text-sm text-muted-foreground">
                    {getAge(
                      enrollment.student.birthDate,
                      enrollment.createdAt,
                      i18n.language
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">القسم </div>
                  <div className="text-sm text-muted-foreground">
                    {enrollment.class.className}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">
                    السنة الدراسية
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {enrollment.academicYear}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <div className="flex w-full md:w-1/2 gap-3 pt-4 px-4">
              <Button
                type="submit"
                onClick={handleShowCard}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                عرض بطاقة التسجيل
              </Button>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-background"
                >
                  إلغاء
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <StudentCard enrollment={enrollment} isOpen={isCardOpen} onOpenChange={setIsCardOpen} />
    </>
  );
}
