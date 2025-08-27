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
import StudentCard from "./StudentCardModal";
import { formatDate } from "@/utils/dateFormatter";
import { getAge } from "@/utils/getLocalizedAge";
import StudentsModal from "./StudentsModal";
import DeleteAlertDialog from "../DeleteAlertDialog";
import { t } from "i18next";

export default function StudentDetails({
  enrollment,
  classes,
  onUpdateStudent,
  onDeleteEnrollment,
}) {
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
            {t("common.details")}
          </Button>
        </DialogTrigger>
        <DialogContent className="px-0 gap-0">
          {/* Header */}
          <DialogHeader className="border-b border-border px-5">
            <DialogTitle className={"rtl:text-right"}>{t("students.details")}</DialogTitle>
          </DialogHeader>

          {/* Content */}
          <div className="py-6 px-8 space-y-8">
            <div className="flex justify-end m-0">
              <StudentsModal
                editingStudent={enrollment}
                classes={classes}
                onUpdateStudent={onUpdateStudent}
              />
              <DeleteAlertDialog
                title={t("students.delete")}
                description={t("students.confirmDelete")}
                item={enrollment._id}
                onDelete={onDeleteEnrollment}
              />
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">
                    {t("students.fullName")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {enrollment.student.firstName} {enrollment.student.lastName}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">
                    {t("students.birthDate")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(enrollment.student.birthDate)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">{t("students.age")}</div>
                  <div className="text-sm text-muted-foreground">
                    {getAge(enrollment.student.birthDate, enrollment.createdAt)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">{t("students.class")}</div>
                  <div className="text-sm text-muted-foreground">
                    {enrollment.class.className}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-1/2 text-foreground">
                    {t("students.academicYear")}
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
                {t("students.printCard.showCard")}
              </Button>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-background"
                >
                  {t("common.cancel")}
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <StudentCard
        enrollment={enrollment}
        isOpen={isCardOpen}
        onOpenChange={setIsCardOpen}
      />
    </>
  );
}
