import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";
import QrScanner from "qr-scanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Scan, ScanBarcode } from "iconsax-react";
import api from "@/api";
import StudentCardInforamtion from "../students/StudentCardInforamtion";
import { useIsMobile } from "@/hooks/use-mobile";
import { t } from "i18next";

export default function ScanAttendance({ onAttendanceCreate }) {
  const [status, setStatus] = useState("present");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [student, setStudent] = useState({});
  const [focused, setFocused] = useState(false);

  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const lastScannedRef = useRef(null);
  const inputRef = useRef(null);

  const isMobile = useIsMobile();

  const startScanning = async () => {
    try {
      setCameraError("");
      setIsScanning(true);

      // Wait a bit for the video element to be ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (videoRef.current) {
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            console.log("QR Code detected:", result.data);
            handleQRResult(result.data);
            setScannedData(true);
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: "environment",
            maxScansPerSecond: 1,
          }
        );

        await qrScannerRef.current.start();
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(
        "لا يمكن الوصول إلى الكاميرا. تأكد من منح الإذن للكاميرا."
      );
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
    setScannedData(false);
  };

  const handleQRResult = async (data) => {
    if (lastScannedRef.current === data) {
      return;
    }
    lastScannedRef.current = data;
    try {
      setLoading(true);
      const res = await api.get(`/enrollments/${data}`);
      await onAttendanceCreate({ ids: data, status });
      setStudent(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          stopScanning();
        }
      }}
    >
      <DialogTrigger className="w-full">
        <Button className="w-full sm:w-auto">{t("attendance.checkIn")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold rtl:text-right">
            {t("attendance.checkIn")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {!isScanning ? (
            isMobile ? (
              <div className="w-full flex justify-center">
                <Button
                  variant="outline"
                  className="border-primary text-primary border-2"
                  onClick={startScanning}
                >
                  {t("attendance.scanQRCode")}
                  <ScanBarcode color="currentColor" />
                </Button>
              </div>
            ) : (
              <div className="w-full flex justify-center relative">
                <Button
                  variant={focused ? "default" : "outline"}
                  className={
                    focused ? "" : "border-primary text-primary border-2"
                  }
                  onClick={() => {
                    inputRef.current?.focus();
                  }}
                >
                  {t("attendance.scanQRCode")}
                  <Scan color="currentColor" />
                </Button>

                <input
                  ref={inputRef}
                  type="text"
                  autoFocus
                  className="absolute opacity-0 pointer-events-none"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const scannedValue = e.currentTarget.value.trim();
                      if (scannedValue) {
                        handleQRResult(scannedValue);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
            )
          ) : (
            <div className="relative">
              {cameraError ? (
                <div className="text-center p-8">
                  <Camera className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 text-sm mb-4">{cameraError}</p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={startScanning} size="sm" variant="outline">
                      {t("common.retry")}
                    </Button>
                    <Button onClick={stopScanning} size="sm" variant="outline">
                      {t("common.cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    className="w-45 h-45 object-cover mx-auto rounded-2xl"
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Instructions */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {t("attendance.instructions")}
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      onClick={stopScanning}
                      size="sm"
                      variant="destructive"
                    >
                      X
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Show scanned data if available */}
          {scannedData && (
            <div>
              <StudentCardInforamtion enrollment={student} loading={loading} />
            </div>
          )}

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="font-medium">
              {t("attendance.status")}
            </Label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="rtl:text-right">
                <SelectValue placeholder={t("attendance.statusPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">{t("attendance.present")}</SelectItem>
                <SelectItem value="late">{t("attendance.late")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
