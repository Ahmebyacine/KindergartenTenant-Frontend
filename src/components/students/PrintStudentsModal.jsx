import StudentCardsPDFButton from "@/services/PDF/StudentCardsPDFButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

export default function PrintStudentsModal({ enrollments }) {
  const { config } = useAuth();
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button size="sm" className="text-primary" variant={"ghost"}>
          طباعة البطاقات
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print Students Cards</DialogTitle>
        </DialogHeader>
      <DialogFooter>
        <div className="flex gap-4 mt-6 justify-center">
        <StudentCardsPDFButton enrollments={enrollments} config={config} />
          <Button
            variant="outline"
            //onClick={() => setOpen(false)}
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
