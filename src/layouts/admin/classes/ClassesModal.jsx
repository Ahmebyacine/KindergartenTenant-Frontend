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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { t } from "i18next";

const classSchema = (t) => z.object({
  className: z.string().min(1, t("common.required")),
  category: z.string().min(1, t("common.required")),
  capacity: z.number().min(1, t("classes.validation.minCapacity")),
  price: z
    .number({ invalid_type_error: t("classes.validation.priceNumber") })
    .min(0, t("classes.validation.minPrice"))
    .optional(),
});

export default function ClassesModal({
  onAddClass,
  onUpdateClass,
  categories,
  editingClass = null,
  isLimited = false,
}) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(classSchema(t)),
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
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingClass ? (
          <Button variant="link" size="sm" className="underline">
            {t("common.edit")}
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              if (isLimited) {
                e.preventDefault();
                toast.error(t("classes.limitReached"));
              }
            }}
            className={`${
              isLimited &&
              "hover:bg-primary/30 bg-primary/30 cursor-not-allowed"
            } rounded-lg px-6 py-2 flex items-center gap-2`}
          >
            <Add size="20" color="currentColor" />
            {t("classes.addNew")}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-md bg-card p-6 rounded-lg sm:rounded-2xl">
        <DialogHeader className="border-b-2 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
              {editingClass ? t("classes.editTitle") : t("classes.addTitle")}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
            <div className="grid grid-cols-1 gap-4">
              {/* Class Name */}
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      {t("classes.nameLabel")} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rtl:text-right"
                        placeholder={t("classes.namePlaceholder")}
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
                      {t("classes.categoryLabel")} *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rtl:text-right">
                          <SelectValue placeholder={t("classes.categoryPlaceholder")} />
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
                      {t("classes.capacityLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="rtl:text-right"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                      {t("classes.priceLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        className="rtl:text-right"
                        placeholder={t("classes.pricePlaceholder")}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
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
              {editingClass ? t("common.update") : t("common.add")}
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:bg-background"
              >
                {t("common.cancel")}
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
