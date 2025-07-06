import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Camera } from "lucide-react";
import QrScanner from "qr-scanner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScanBarcode } from "iconsax-react";
import api from "@/services/api";
import StudentCardInforamtion from "../students/StudentCardInforamtion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "../ui/input";

export default function ScanAttendance() {
  const [status, setStatus] = useState("مكتمل");
  const [notes, setNotes] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [student, setStudent] = useState({});

  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

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
    setScannedData(false)
  };

  const handleQRResult = async (data) => {
    try {
      setLoading(true);
      const res = await api.get(`/enrollments/${data}`);
      console.log(res.data);
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
    <Dialog>
      <DialogTrigger>
        <Button>تسجيل الحضور</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold rtl:text-right">
            تسجيل الحضور
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {!isScanning ? (
            isMobile && (
              <div className="w-full flex justify-center">
                <Button
                  variant="outline"
                  className="border-primary text-primary border-2"
                  onClick={startScanning}
                >
                  مسح رمز الاستجابة السريعة
                  <ScanBarcode color="currentColor" />
                </Button>
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
                      إعادة المحاولة
                    </Button>
                    <Button onClick={stopScanning} size="sm" variant="outline">
                      إلغاء
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
                      وجه الكاميرا نحو رمز الاستجابة السريعة
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
            <Label htmlFor="status" className="text-[#111827] font-medium">
              الحالة
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="text-right bg-[#f8fafc] border-[#e2e8f0]">
                <div className="flex items-center gap-2">
                  <span className="bg-[#dcfce7] text-[#008236] px-3 py-1 rounded-full text-sm font-medium">
                    مكتمل
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="مكتمل">
                  <span className="bg-[#dcfce7] text-[#008236] px-3 py-1 rounded-full text-sm font-medium">
                    مكتمل
                  </span>
                </SelectItem>
                <SelectItem value="غير مكتمل">غير مكتمل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-[#111827] font-medium">
              ملاحظات
            </Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-right resize-none"
            />
          </div>
        </div>
        {/* Action Buttons */}
        <DialogFooter>
          <div className="flex md:w-1/2">
            <DialogClose>
              <Button
                onClick={stopScanning}
                variant="outline"
                className="text-muted-foreground border-border"
              >
                الغاء
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
