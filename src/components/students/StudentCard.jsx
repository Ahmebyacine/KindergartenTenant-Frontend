import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import img from "@/assets/images/avatar.png";
import i18n from "@/i18n";
import { getAge } from "@/utils/getLocalizedAge";
import { formatDate } from "@/utils/dateFormatter";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function StudentCard({
  enrollment,
  isOpen,
  onOpenChange,
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Generate modern QR code when component mounts or enrollment changes
  useEffect(() => {
    if (enrollment && enrollment._id) {
      generateModernQRCode(enrollment._id);
    }
  }, [enrollment]);

  const generateModernQRCode = async (data) => {
    try {
      const url = await QRCode.toDataURL(data, {
        width: 120,
        color: {
          dark: '#000000',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold">
            عرض البطاقة
          </DialogTitle>
          <div></div>
        </DialogHeader>

        {/* Card Content */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
          <div className="flex flex-wrap gap-2 items-start">
            {/* Student Photo */}
            <div className="w-[35%] flex justify-center my-auto p-1 md:p-3">
              <div className="rounded-full overflow-hidden border-4 border-border">
                <img
                  src={img}
                  alt="Student Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Student Information */}
            <div className="flex-1 space-y-2 my-auto">
              <div className="space-y-2 md:space-y-2">
                {[
                  [
                    "الاسم الكامل",
                    `${enrollment.student.firstName} ${enrollment.student.lastName}`,
                  ],
                  [
                    "تاريخ الميلاد",
                    formatDate(enrollment.student.birthDate, i18n.language),
                  ],
                  [
                    "العمر",
                    getAge(
                      enrollment.student.birthDate,
                      enrollment.createdAt,
                      i18n.language
                    ),
                  ],
                  ["الجنس", enrollment.student.gender],
                  ["الروضة", "روضة التور"],
                  ["الدرجة الجمعية", "A+"],
                  ["الفصل", enrollment.class.className],
                  ["السنة الدراسية", enrollment.academicYear],
                ].map(([label, value]) => (
                  <div
                    className="flex items-center md:text-[13px] text-[9px]"
                    key={label}
                  >
                    <div className="w-1/2 text-muted-foreground">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Styled QR Code */}
            <div className="w-[25%] flex justify-center my-auto px-2">
              <div className="relative bg-white rounded-xl shadow-lg border-2 border-border p-3 transform hover:scale-105 transition-transform duration-200">
                {/* Decorative corner elements */}
                <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-black rounded-tl-lg"></div>
                <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-black rounded-tr-lg"></div>
                <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-black rounded-bl-lg"></div>
                <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-black rounded-br-lg"></div>
                
                {qrCodeUrl ? (
                  <div className="relative">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-[120px] h-[120px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-border mx-auto mb-2"></div>
                      <span className="text-xs text-blue-600 font-medium">جاري التحميل...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <DialogFooter>
          <div className="flex gap-4 mt-6 justify-center">
            <Button variant="default">طباعة</Button>
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