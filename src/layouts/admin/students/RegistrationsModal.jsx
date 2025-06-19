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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
export default function RegistrationsModal({ classes }) {
  const [selectedClass, setSelectedClass] = useState()
  const [isClassOpen, setIsClassOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  return (
    <div className="bg-background px-4 md:p-0 flex items-center justify-center">
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
              <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground text-center w-full">
                إعادة التسجيل
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="relative w-full sm:w-64">
            <SearchNormal1
              size="16"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              color="currentColor"
            />
            <Input
              placeholder="البحث"
              className="pr-10 pl-4 py-2 bg-background"
            />
          </div>
          <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg border-0 p-0" dir="rtl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-5 w-5 text-[#6b7280]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#111827]">إعادة التسجيل</h1>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Full Name Field with Search */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#62748e] text-sm font-medium">
                الاسم الكامل
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 border border-[#e2e8f0] rounded-lg bg-white text-right"
                  placeholder="ابحث عن الاسم أو أدخل اسم جديد"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6b7280]" />
              </div>
            </div>

            {/* Class Selection Field with Search */}
            <div className="space-y-2">
              <Label className="text-[#62748e] text-sm font-medium">اختيار الفصل</Label>
              <Popover open={isClassOpen} onOpenChange={setIsClassOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isClassOpen}
                    className="w-full h-12 justify-between border border-[#e2e8f0] rounded-lg bg-white text-right"
                  >
                    {selectedClass || "اختر الفصل"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="ابحث عن الفصل..." className="text-right" />
                    <CommandList>
                      <CommandEmpty>لا توجد نتائج.</CommandEmpty>
                      <CommandGroup>
                        {classes.map((classItem) => (
                          <CommandItem
                            key={classItem.value}
                            value={classItem.value}
                            onSelect={(currentValue) => {
                              setSelectedClass(currentValue === selectedClass ? "" : currentValue)
                              setIsClassOpen(false)
                            }}
                            className="text-right"
                          >
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                selectedClass === classItem.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {classItem.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Academic Year Field */}
            <div className="space-y-2">
              <Label htmlFor="academicYear" className="text-[#62748e] text-sm font-medium">
                السنة الدراسية الجديدة
              </Label>
              <div className="relative">
                <Input
                  id="academicYear"
                  type="text"
                  value="2024-2025"
                  readOnly
                  className="w-full h-12 pl-10 pr-4 border border-[#e2e8f0] rounded-lg bg-white text-right"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6b7280]" />
              </div>
            </div>
          </div>
        </DialogContent>
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
