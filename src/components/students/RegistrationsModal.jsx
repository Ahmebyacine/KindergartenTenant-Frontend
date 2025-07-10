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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar, SearchNormal1 } from "iconsax-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const searchData = [
  { id: 1, title: "React Components", category: "Development" },
  { id: 2, title: "Next.js App Router", category: "Development" },
  { id: 3, title: "Tailwind CSS", category: "Styling" },
  { id: 4, title: "TypeScript Guide", category: "Development" },
  { id: 5, title: "JavaScript Fundamentals", category: "Development" },
  { id: 6, title: "CSS Grid Layout", category: "Styling" },
  { id: 7, title: "Node.js Backend", category: "Backend" },
  { id: 8, title: "Database Design", category: "Backend" },
  { id: 9, title: "API Development", category: "Backend" },
  { id: 10, title: "UI/UX Design", category: "Design" },
  { id: 11, title: "Responsive Design", category: "Design" },
  { id: 12, title: "Color Theory", category: "Design" },
];

export default function RegistrationsModal({ classes }) {
  const [selectedClass, setSelectedClass] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const categories = ["Development", "Styling", "Backend", "Design"];

  const handleSelect = (value) => {
    setSearchValue(value);
    setIsFocused(true);
  };

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
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="ابحث عن الاسم"
                value={searchValue}
                onValueChange={setSearchValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)} // Delay to allow item click
                className="flex w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />

              {isFocused && (
                <CommandList className="max-h-30">
                  <CommandEmpty>لا توجد نتائج لـ "{searchValue}"</CommandEmpty>

                  {categories.map((category) => {
                    const categoryItems = searchData.filter(
                      (item) =>
                        item.category === category &&
                        item.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    );

                    if (categoryItems.length === 0) return null;

                    return (
                      <CommandGroup key={category} heading={category}>
                        {categoryItems.map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.title}
                            onSelect={handleSelect}
                            className="cursor-pointer"
                          >
                            <span>{item.title}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })}
                </CommandList>
              )}
            </Command>

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
