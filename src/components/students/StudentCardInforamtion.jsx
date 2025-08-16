import { useEffect, useState } from "react";
import StudentCardLoading from "./StudentCardLoading";
import { useAuth } from "@/contexts/AuthContext";
import { generateQRCode } from "@/utils/generateQRCode";

export default function StudentCardInforamtion({
  enrollment,
  loading = false,
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { config } = useAuth();

  // Generate modern QR code when component mounts or enrollment changes
  useEffect(() => {
    const loadQRCode = async () => {
      if (enrollment && enrollment._id) {
        const url = await generateQRCode(enrollment._id);
        setQrCodeUrl(url);
      }
    };
    loadQRCode();
  }, [enrollment]);

  if (loading) return <StudentCardLoading />;
  return (
    <div className="bg-primary text-card-foreground flex flex-col gap-6 rounded-2xl border p-3 sm:p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 items-start">
        {/* Student Photo */}
        <div className="w-[35%] flex flex-col items-center sm:gap-y-2 gap-y-1 justify-center my-auto p-1 md:p-3">
          <div className="rounded-full overflow-hidden border-2 border-border">
            <img
              src={
                enrollment?.student?.image
                  ? import.meta.env.VITE_API_URL_PICTURE +
                    enrollment?.student?.image
                  : "src/assets/images/avatar.png"
              }
              alt="Student Photo"
              className="rounded-full object-cover aspect-square w-24 md:w-30"
            />
          </div>
          <p className="text-secondary-foreground text-center font-semibold text-sm sm:text-xl">
            {`${enrollment?.student?.firstName} ${enrollment?.student?.lastName}`}
          </p>
          <p className="text-secondary-foreground text-sm">
            {config?.kindergraten || "Rawdatee -platform-"}
          </p>
        </div>

        {/* Student Information */}
        <div className="flex-1 flex flex-col items-center space-y-2 my-auto bg-card rounded-2xl py-2 sm:py-4">
          <div className="space-y-2 md:space-y-2 w-full flex flex-col items-center ">
            {[
              ["الزمرة الدموية", enrollment?.student?.bloodGroup || "غير محدد"],
              ["الفصل", enrollment?.class?.className],
              ["السنة الدراسية", enrollment?.academicYear],
            ].map(([label, value], i) => (
              <div
                className="flex sm:text-[13px] text-[10.5px] w-3/4"
                key={label}
              >
                <div className="w-1/2 text-muted-foreground">{label}</div>
                <div dir={i ? "rtl" : "ltr"}>{value}</div>
              </div>
            ))}
          </div>

          {/*  Styled QR Code */}
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
  );
}
