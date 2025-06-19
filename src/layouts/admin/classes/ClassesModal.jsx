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

const classSchema = z.object({
  className: z.string().min(1, "مطلوب"),
  teacher: z.string(),
  category: z.string().min(1, "مطلوب"),
  capacity: z.number().min(1, "الحد الأدنى للقدرة هو 1"),
});

export default function ClassesModal({ onAddClass, categories }) {
  const form = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      className: "",
      teacher: "",
      category: "",
      capacity: 20,
    },
  });

  const onSubmit = (data) => {
    onAddClass(data);
    form.reset();
    DialogClose();
  };

  return (
    <div className="bg-background p-4 flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 flex items-center gap-2">
            <Add size="20" color="currentColor" />
            إضافة فصل
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-full sm:max-w-md bg-card p-6 rounded-lg sm:rounded-2xl">
          <DialogHeader className="border-b-2 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground text-center w-full">
                إضافة فصل جديد
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
                        اسم الفصل
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

                {/* Teacher */}
                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        المعلمة
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="اختر المعلمة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="سارة أحمد">سارة أحمد</SelectItem>
                          <SelectItem value="مريم خالد">مريم خالد</SelectItem>
                          <SelectItem value="فاطمة علي">فاطمة علي</SelectItem>
                          <SelectItem value="نورا محمد">نورا محمد</SelectItem>
                        </SelectContent>
                      </Select>
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
                        فئة
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
                          {categories.map((category) => (
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
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
            <div className="flex flex-col sm:flex-row w-full gap-3 pt-4">
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                إضافة
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