import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StudentCardInforamtion from "./StudentCardInforamtion";
import api from "@/api";

export default function StudentCardModal({ enrollment, isOpen, onOpenChange }) {
  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        "/pdf/id1",
        { enrollments: [enrollment] },
        {
          responseType: "blob",
        }
      );

      // 🔹 تحويل الـ blob إلى رابط وفتحه
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);

      onOpenChange(false);
    } catch (error) {
      console.error("Error printing cards:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-2 sm:p-4">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold">
            عرض البطاقة
          </DialogTitle>
        </DialogHeader>

        {/* Card Content */}
        <StudentCardInforamtion enrollment={enrollment} />

        {/* Action Buttons */}
        <DialogFooter>
          <div className="flex gap-4 mt-6 justify-center">
            <Button onClick={handlePrint} disabled={loading}>
              {loading ? "جارٍ التحميل..." : "طباعة"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground"
            >
              إلغاء
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
