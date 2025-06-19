import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Setting4, Trash } from "iconsax-react"
import i18n from "@/i18n"

export default function StudentsFilter({classes}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState()
  const [selectedMonth, setSelectedMonth] = useState()

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
  "أوت"      
];

  const handleReset = () => {
    setSelectedClass("")
    setSelectedMonth("")
  }

  return (
    <div className="relative flex justify-start px-4 bg-background">
      {/* Top right filter button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className={`${isOpen && "text-primary border-primary"} w-full `}
      >
        <Setting4 size={14} color="currentColor" />
        فلاترة
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl p-0 overflow-hidden bg-background">
          <DialogHeader className="p-6 pb-0 flex flex-row justify-start items-center relative">
            {/* Close button positioned top-left */}
            <Button variant="ghost" size="icon" className="absolute top-4 left-4" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <DialogTitle className="sr-only">Filter Options</DialogTitle>
          </DialogHeader>
          <div className={`p-6 pt-0 space-y-6 ${i18n.language === 'ar' ? 'text-right': 'text-left'}`}>
            {/* Filter by Student by classes */}
            <div>
              <h3 className="text-lg font-semibold mb-3">فلترة حسب الفصل:</h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {classes.map((type) => (
                  <Button
                    key={type._id}
                    variant="outline"
                    className={`rounded-full px-4 py-2 text-sm ${
                      selectedClass === type._id
                        ? "border-primary text-primary bg-backgroun"
                        : "border-border bg-card"
                    }`}
                    onClick={() => setSelectedClass(type._id)}
                  >
                    {type.className}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filter by classes */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#111827]">فلاترة حسب الشهر:</h3>
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
            <Button variant="ghost" className="text-[#111827] flex items-center gap-1" onClick={handleReset}>
              <Trash size={14} color="currentColor" />
              إعادة تعيين الكل
            </Button>
            <Button className="bg-[#4f46e5] text-white rounded-lg px-6 py-3 hover:bg-[#4f46e5]/90">
              تطبيق الفلاتر
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}