import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { Add } from "iconsax-react";

const favorSchema = z.object({
  category: z.string().min(1, "مطلوب"),
  amount: z.number().min(1, "يجب أن يكون المبلغ أكبر من 0"),
  date: z.string().min(1, "مطلوب"),
  paymentMethod: z.string().min(1, "مطلوب"),
  description: z.string().min(1, "مطلوب"),
});

export default function ExpensesModal({expenseTypes}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(favorSchema),
    defaultValues: {
      category: "",
      amount: 0,
      date: "",
      paymentMethod: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    console.log("تم تسجيل مصروف:", data);
    reset();
  };

  // Payment methods
  const paymentMethods = [
    "نقدًا",
    "تحويل بنكي",
    "شيك",
    "بطاقة ائتمان"
  ];

  return (
    <div className="bg-background p-2 md:p-4 flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-lg px-6 py-2 flex items-center gap-2">
            <Add size="20" color="currentColor" />
            تسجيل مصروف جديد
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-6 rounded-lg sm:rounded-2xl">
          <DialogHeader className="border-b-2 pb-4">
              <DialogTitle className="text-lg rtl:text-right ltr:text-left sm:text-xl font-semibold text-foreground">
                تسجيل مصروف جديد
              </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
            dir="rtl"
          >
            <div className="space-y-2">
              <div className="text-lg font-semibold text-foreground pb-2 border-b border-border">
                تصنيف مصروف
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">التصنيف</Label>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                    defaultValue=""
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseTypes.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">المبلغ (دج)</Label>
                  <Input
                    type="number"
                    {...register("amount", { valueAsNumber: true })}
                    className="text-right"
                    placeholder="6000"
                  />
                  {errors.amount && (
                    <p className="text-sm text-destructive">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-lg font-semibold text-foreground pb-2 border-b border-border">
                طريقة الدفع
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Method */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">طريقة الدفع</Label>
                  <Select
                    onValueChange={(value) => setValue("paymentMethod", value)}
                    defaultValue=""
                  >
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر طريقة الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.paymentMethod && (
                    <p className="text-sm text-destructive">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Description */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">الوصف</Label>
                <Textarea
                  {...register("description")}
                  className="text-right"
                  placeholder="تصليح كراسي"
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Action Buttons */}
          <DialogFooter>
            <div className="flex w-full md:w-1/2 gap-3 pt-4">
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
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