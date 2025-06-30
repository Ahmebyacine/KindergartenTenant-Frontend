import { useState } from "react";
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

export default function ReportsFilter() {
  const [selectedMonth, setSelectedMonth] = useState();

  const months = [
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
    "جانفي",
    "فيفري",
    "مارس",
    "أفريل",
    "ماي",
    "جوان",
    "جويليه",
    "أوت",
  ];

  const handleReset = () => {
    setSelectedMonth("");
  };

  return (
    <div className="bg-background p-2 md:p-4 flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={`data-[state=open]:text-primary data-[state=open]:border-primary w-full `}
          >
            <Setting4 size={14} color="currentColor" />
            <span className="hidden md:block">فلاترة</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px] rounded-xl p-0 overflow-hidden bg-background">
          <DialogHeader className="p-6 pb-0 flex flex-row justify-start items-center relative">
            <DialogTitle className="sr-only">Filter Options</DialogTitle>
          </DialogHeader>
          <div className={`p-6 pt-0 space-y-6 rtl:text-right ltr:text-left`}>

            {/* Filter by month section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">فلاترة حسب الشهر:</h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {months.map((month) => (
                  <Button
                    key={month}
                    variant="outline"
                    className={`rounded-full px-4 py-2 text-sm ${
                      selectedMonth === month
                        ? "border-primary text-primary bg-backgroun"
                        : "border-border bg-card"
                    }`}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {month}
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
              إعادة تعيين الكل
            </Button>
            <Button className="bg-primary rounded-lg px-6 py-3 hover:bg-primary/90">
              تطبيق الفلاتر
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
