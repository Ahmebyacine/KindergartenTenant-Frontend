import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Add } from "iconsax-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { toast } from "sonner";

const classSchema = z.object({
  className: z.string().min(1, "مطلوب"),
  category: z.string().min(1, "مطلوب"),
  capacity: z.number().min(1, "الحد الأدنى للقدرة هو 1"),
  price: z
    .number({ invalid_type_error: "يجب أن يكون السعر رقمًا" })
    .min(0, "الحد الأدنى للسعر هو 0")
    .optional(),
});

export default function ClassesModal({
  onAddClass,
  onUpdateClass,
  categories,
  editingClass = null,
  isLimited= false
}) {
  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      className: editingClass?.className || "",
      category: editingClass?.category?._id || "",
      capacity: editingClass?.capacity || 20,
      price: editingClass?.price || "",
    },
  });

  useEffect(() => {
    form.reset({
      className: editingClass?.className || "",
      category: editingClass?.category?._id || "",
      capacity: editingClass?.capacity || 20,
      price: typeof editingClass?.price === "number" ? editingClass.price : "",
    });
  }, [editingClass, form]);

  const onSubmit = async (data) => {
    if (editingClass) {
      await onUpdateClass({ ...editingClass, ...data });
    } else {
      await onAddClass(data);
    }
    form.reset();
  };
  return (
    <div className="bg-background px-2 flex items-center data-[state=open]:justify-center">
      <Dialog>
        <DialogTrigger asChild>
          {editingClass ? (
            <Button
              variant="link"
              size="sm"
              className="text-primary hover:text-primary/80 p-1 h-auto underline text-xs sm:text-sm justify-start sm:justify-center"
            >
              تعديل
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                if (isLimited) {
                  e.preventDefault();
                  toast.error(
                    `تم الوصول إلى الحد الأقصى للفصول `
                  );
                }
              }}
              className={`${isLimited && "hover:bg-primary/30 bg-primary/30 cursor-not-allowed"} rounded-lg px-6 py-2 flex items-center gap-2`}
            >
              <Add size="20" color="currentColor" />
              إضافة فصل
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="w-full max-w-full sm:max-w-md bg-card p-6 rounded-lg sm:rounded-2xl">
          <DialogHeader className="border-b-2 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
                {editingClass ? "تعديل الفصل" : "إضافة فصل جديد"}
              </DialogTitle>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-2"
            >
              <div className="grid grid-cols-1 gap-4">
                {/* Class Name */}
                <FormField
                  control={form.control}
                  name="className"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        اسم الفصل *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-right"
                          placeholder="أدخل اسم الفصل"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        فئة *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر فئة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Capacity */}
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        السعة
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="text-right"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        سعر الفصل
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="0"
                          className="text-right"
                          placeholder="أدخل سعر الفصل"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          {/* Action Buttons */}
          <DialogFooter>
            <div className="flex w-full md:w-1/2 gap-3 pt-4">
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={editingClass && !form.formState.isDirty}
              >
                {editingClass ? "تحديث" : "إضافة"}
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
