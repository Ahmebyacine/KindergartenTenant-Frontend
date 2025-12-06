import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Setting4, Trash } from "iconsax-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { months } from "@/assets/data/data";
import { useState } from "react";
import { t } from "i18next";

export default function ReportsFilter({ classes, onApplyFilters }) {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleReset = () => {
    setSelectedMonth("");
    setSelectedClass("");
    onApplyFilters("", "");
    setOpen(false);
  };

  return (
    <div className="bg-background p-2 md:p-4 flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={`data-[state=open]:text-primary data-[state=open]:border-primary w-full `}
          >
            <Setting4 size={14} color="currentColor" />
            <span className="hidden md:block">{t("common.filter")}</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px] rounded-xl p-0 overflow-hidden bg-background">
          <DialogHeader className="p-6 pb-0 flex flex-row justify-start items-center relative">
            <DialogTitle className="sr-only">Filter Options</DialogTitle>
          </DialogHeader>
          <div className={`p-6 pt-0 space-y-6 rtl:text-right ltr:text-left`}>
            {/* Filter by classes section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {t("filter.byClass")}
              </h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {classes?.map((classItem) => (
                  <Button
                    key={classItem?._id}
                    variant="outline"
                    className={`rounded-full px-4 py-2 text-sm ${
                      selectedClass === classItem?._id
                        ? "border-primary text-primary bg-background"
                        : "border-border bg-card"
                    }`}
                    onClick={() =>
                      setSelectedClass((prev) =>
                        prev === classItem?._id ? "" : classItem?._id
                      )
                    }
                  >
                    {classItem?.className}
                  </Button>
                ))}
              </div>
            </div>
            {/* Filter by month section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {t("filter.byMonth")}
              </h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {months.map((month) => (
                  <Button
                    key={month.value}
                    variant="outline"
                    className={`rounded-full px-4 py-2 text-sm ${
                      selectedMonth === month.value
                        ? "border-primary text-primary bg-backgroun"
                        : "border-border bg-card"
                    }`}
                    onClick={() =>
                      setSelectedMonth((prev) =>
                        prev === month.value ? "" : month.value
                      )
                    }
                  >
                    {t(month.key)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Dialog Footer with action buttons */}
          <DialogFooter className="p-6 pt-0 flex flex-row-reverse justify-between items-center">
            <Button
              variant="ghost"
              className="flex items-center gap-1"
              onClick={handleReset}
            >
              <Trash size={14} color="currentColor" />
              {t("filter.resetFilters")}
            </Button>
            <Button
              className="bg-primary rounded-lg px-6 py-3 hover:bg-primary/90"
              onClick={() => {
                onApplyFilters(selectedClass, selectedMonth);
                setOpen(false);
              }}
            >
              {t("filter.applyFilters")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
