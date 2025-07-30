import { Card, CardContent } from "@/components/ui/card";
import succes from "@/assets/images/succes.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function SuccesStep({ onPrevious }) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-xl font-semibold ">
          تهانينا! تم إعداد روضتك بنجاح
        </h2>
        <h2 className="text-xl font-semibold ">
          يمكنك الآن بدء استخدام المنصة
        </h2>
      </div>

      <div className="max-w-xl mx-auto gap-6 mb-16">
        <Card className="!border-0">
          <CardContent className="py-2 text-center">
            <img src={succes} alt="aucces" className="max-w-45 mx-auto" />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center mt-16">
        <Button onClick={onPrevious} variant="ghost">
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span className="text-base">السابق</span>
        </Button>

        <Button
          className={`flex items-center gap-2 rounded-xl px-8 py-3 text-base font-medium bg-secondary hover:bg-green-700`}
        >
          <Link to="/">ابدأ الآن</Link>
        </Button>
      </div>
    </div>
  );
}
