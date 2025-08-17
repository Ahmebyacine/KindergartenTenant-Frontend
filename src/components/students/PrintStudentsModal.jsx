import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export default function PrintStudentsModal({ enrollments }) {
  const [open, setOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("A4");
  const { config } = useAuth();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-primary" variant={"ghost"}>
          طباعة البطاقات
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print Students Cards</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label className="text-base font-medium mb-3 block">
            اختر تنسيق البطاقة / Select Card Format
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
            <StudentCardsPDFButton enrollments={enrollments} config={config} mode={selectedFormat} />
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
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
