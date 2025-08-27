import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import api from "@/api";
import { toast } from "sonner";
import { t } from "i18next";

export default function PrintStudentsModal({ enrollments }) {
  const [open, setOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("A4");
  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    try {
      setLoading(true);

      const endpoint = selectedFormat === "A4" ? "/pdf/a4" : "/pdf/id1";

      const response = await api.post(
        endpoint,
        { enrollments },
        {
          responseType: "blob",
        }
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      const newWindow = window.open(fileURL, "_blank");

      if (newWindow) {
        newWindow.onload = () => {
          // A slight delay to ensure the PDF is fully rendered before printing
          setTimeout(() => {
            newWindow.print();
          }, 500);
        };
      } else {
        // This case handles pop-up blockers
        toast.error(
          "خطأ: لم نتمكن من فتح نافذة جديدة. يرجى السماح بالنوافذ المنبثقة."
        );
      }

      setOpen(false);
    } catch (error) {
      console.error("Error printing cards:", error);
      toast.error("حدث خطأ أثناء طباعة البطاقات. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-primary" variant={"ghost"}>
          {t("students.printCards.title")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("students.printCards.description")}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label className="text-base font-medium mb-3 block">
            {t("students.printCards.selectFormat")}
          </Label>
          <RadioGroup
            value={selectedFormat}
            onValueChange={setSelectedFormat}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="A4" id="a4" />
              <Label htmlFor="a4" className="cursor-pointer">
                A4 Format - تنسيق A4
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="ID1" id="id1" />
              <Label htmlFor="id1" className="cursor-pointer">
                ID1 Format - تنسيق ID1
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <div className="flex gap-4 mt-6 justify-center">
            <Button onClick={handlePrint} disabled={loading}>
              {loading ? t("common.loading") : t("students.printCards.print")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-muted-foreground"
            >
              {t("common.cancel")}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
