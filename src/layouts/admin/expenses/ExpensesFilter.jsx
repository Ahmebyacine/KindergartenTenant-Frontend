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
import { expenseTypes, months } from "@/assets/data/data";
import { useState } from "react";
import { t } from "i18next";

export default function ExpensesFilter({ onApplyFilters }) {
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  return (
    <div className="bg-background p-2 md:p-4 flex items-center justify-center">
      <Dialog>
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
            {/* Filter by expense type section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {t("expenses.filterByType")}
              </h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {expenseTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant="outline"
                    className={`rounded-full px-4 py-2 text-sm ${
                      selectedExpenseType === type.value
                        ? "border-primary text-primary bg-backgroun"
                        : "border-border bg-card"
                    }`}
                    onClick={() =>
                      setSelectedExpenseType((prev) =>
                        prev === type.value ? "" : type.value
                      )
                    }
                  >
                    {t(type.key)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filter by month section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">{t("expenses.filterByMonth")}</h3>
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
              onClick={() => {
                setSelectedExpenseType("");
                setSelectedMonth("");
                onApplyFilters("", "");
              }}
            >
              <Trash size={14} color="currentColor" />
              {t("filter.resetFilters")}
            </Button>
            <Button
              className="bg-primary rounded-lg px-6 py-3 hover:bg-primary/90"
              onClick={() => onApplyFilters(selectedExpenseType, selectedMonth)}
            >
              {t("filter.applyFilters")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
