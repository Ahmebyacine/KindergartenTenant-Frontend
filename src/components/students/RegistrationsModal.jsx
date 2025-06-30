import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function RegistrationsModal({ classes }) {
  const [selectedClass, setSelectedClass] = useState();
  const [fullName, setFullName] = useState("");
  return (
    <div className="bg-background data-[state=open]:px-4 px-2 md:p-0 flex w-full items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-primary/90 text-primary border-primary rounded-lg px-6 py-2 flex items-center gap-2 w-full sm:w-auto"
          >
            اعادة تسجيل
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
          <DialogHeader className="border-b-2 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
                إعادة التسجيل
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Full Name Field with Search */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-muted-foreground text-sm font-medium"
              >
                الاسم الكامل
              </Label>
              <div className="relative">
                <SearchNormal1
                  size="16"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  color="currentColor"
                />
                <Input
                  id="fullName"
                  type="text"
                  className="pr-10 pl-4 py-2 bg-background"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ابحث عن الاسم أو أدخل اسم جديد"
                />
              </div>
            </div>

            {/* Class Selection Field with Search */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm font-medium">
                اختيار الفصل
              </Label>
              <Select
                value={selectedClass}
                onValueChange={(value) => setSelectedClass(value)}
              >
                <SelectTrigger className="border border-border rounded-lg">
                  <SelectValue placeholder="اختر الفصل" />
                </SelectTrigger>
                <SelectContent className="text-right" align="end">
                  {classes.map((classItem) => (
                    <SelectItem
                      key={classItem._id}
                      value={classItem._id}
                      className="text-right"
                    >
                      {classItem.className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Academic Year Field */}
            <div className="space-y-2">
              <Label
                htmlFor="academicYear"
                className="text-muted-foreground text-sm font-medium"
              >
                السنة الدراسية الجديدة
              </Label>
              <div className="relative">
                <Input
                  id="academicYear"
                  type="text"
                  value="2024-2025"
                  readOnly
                  className="w-full h-12 pl-10 pr-4 border border-border rounded-lgtext-right"
                />
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  color="currentColor"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full md:w-1/2 gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                حفظ
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
    </div>
  );
}
