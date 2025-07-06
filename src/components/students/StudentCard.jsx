import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import img from "@/assets/images/avatar.png";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function StudentCard({ enrollment, isOpen, onOpenChange }) {
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
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: "M",
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
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
        <div className="bg-primary text-card-foreground flex flex-col gap-6 rounded-2xl border p-3 sm:p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 items-start">
            {/* Student Photo */}
            <div className="w-[35%] flex flex-col items-center sm:gap-y-2 gap-y-1 justify-center my-auto p-1 md:p-3">
              <div className="rounded-full overflow-hidden border-2 border-border">
                <img
                  src={img}
                  alt="Student Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-secondary-foreground font-bold text-md sm:text-xl">
                {`${enrollment.student.firstName} ${enrollment.student.lastName}`}
              </p>
              <p className="text-secondary-foreground text-sm">روضة التور</p>
            </div>

            {/* Student Information */}
            <div className="flex-1 flex flex-col items-center space-y-2 my-auto bg-card rounded-2xl py-2 sm:py-4">
              <div className="space-y-2 md:space-y-2 w-full flex flex-col items-center ">
                {[
                  ["الزمرة الدموية", "A+"],
                  ["الفصل", enrollment.class.className],
                  ["السنة الدراسية", enrollment.academicYear],
                ].map(([label, value]) => (
                  <div
                    className="flex sm:text-[13px] text-[10.5px] w-3/4"
                    key={label}
                  >
                    <div className="w-1/2 text-muted-foreground">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>

              {/* Modern Styled QR Code */}
              <div className="w-[50%] sm:w-[45%] flex justify-center my-auto px-2">
                <div className="relative bg-white rounded-xl shadow-lg border-2 border-border transform hover:scale-105 transition-transform duration-200">
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
                        <span className="text-xs text-blue-600 font-medium">
                          جاري التحميل...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
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
