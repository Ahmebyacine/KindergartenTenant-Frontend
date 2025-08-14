import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(1, "مطلوب"),
});

export default function CategoryModal({
  onAddCategory,
  onUpdateCategory,
  editingCategory = null,
  isLimited = false,
}) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: editingCategory?.name || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: editingCategory?.name || "",
    });
  }, [editingCategory, form]);

  const onSubmit = async (data) => {
    if (editingCategory) {
      await onUpdateCategory({ ...editingCategory, ...data });
    } else {
      await onAddCategory(data);
    }
    form.reset();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingCategory ? (
          <Button
            variant="link"
            size="sm"
            className="underline"
          >
            تعديل
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              if (isLimited) {
                e.preventDefault();
                toast.error(`تم الوصول إلى الحد الأقصى للفئات `);
              }
            }}
            className={`${
              isLimited &&
              "bg-primary/30 hover:bg-primary/10 cursor-not-allowed"
            } rounded-xl`}
          >
            <Plus />
            أضف فئة مخصصة
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-md bg-card p-6 rounded-lg sm:rounded-2xl">
        <DialogHeader className="border-b-2 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
              {editingCategory ? "تعديل الفصل" : "إضافة فصل جديد"}
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
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      اسم الفئة *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-right"
                        placeholder="أدخل اسم الفئة"
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
              disabled={editingCategory && !form.formState.isDirty}
            >
              {editingCategory ? "تحديث" : "إضافة"}
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
  );
}
