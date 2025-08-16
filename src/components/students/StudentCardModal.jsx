import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StudentCardInforamtion from "./StudentCardInforamtion";
import StudentCardsPDFButton from "@/services/PDF/StudentCardsPDFButton";
import { useAuth } from "@/contexts/AuthContext";

export default function StudentCardModal({ enrollment, isOpen, onOpenChange }) {
  const { config } = useAuth();
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
            <StudentCardsPDFButton enrollments={[enrollment]} config={config}/>
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
