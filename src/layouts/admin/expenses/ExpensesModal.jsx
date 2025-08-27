import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Textarea } from "@/components/ui/textarea";
import { Add } from "iconsax-react";
import { expenseTypes } from "@/assets/data/data";
import { useEffect, useState } from "react";
import { t } from "i18next";

// Updated schema to match API requirements
const expenseSchema = (t) => z.object({
  category: z.string().min(1, t("common.required")),
  amount: z.number().min(1, t("expenses.amountMustBePositive")),
  description: z.string().min(1, t("common.required")),
});

export default function ExpensesModal({
  onAddExpense,
  onUpdateExpense,
  editingExpense = null,
}) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(expenseSchema(t)),
    defaultValues: {
      category: editingExpense?.category || "",
      amount: editingExpense?.amount || 0,
      description: editingExpense?.description || "",
    },
  });
  useEffect(() => {
    form.reset({
      category: editingExpense?.category || "",
      amount: editingExpense?.amount || 0,
      description: editingExpense?.description || "",
    });
  }, [editingExpense, form]);

  const onSubmit = async (data) => {
    if (editingExpense) {
      await onUpdateExpense({ ...editingExpense, ...data });
    } else {
      await onAddExpense(data);
    }
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingExpense ? (
          <Button variant="link" size="sm" className="underline">
            {t("common.edit")}
          </Button>
        ) : (
          <Button>
            <Add size="20" color="currentColor" />
            {t("expenses.addNewExpense")}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-6 rounded-lg sm:rounded-2xl">
        <DialogHeader className="border-b-2 pb-4">
          <DialogTitle className="text-lg rtl:text-right sm:text-xl font-semibold text-foreground">
            {editingExpense ? t("common.editExpense") : t("expenses.addNewExpense")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">
                        {t("expenses.category")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rtl:text-right">
                            <SelectValue placeholder={t("expenses.categoryPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expenseTypes.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {t(category.key)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">
                        {t("expenses.amount")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="rtl:text-right"
                          placeholder="6000"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground">
                      {t("expenses.description")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="rtl:text-right"
                        placeholder={t("expenses.descriptionPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <div className="flex w-full md:w-1/2 gap-3 pt-4">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={editingExpense && !form.formState.isDirty}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50"
            >
              {editingExpense ? t("common.update") : t("common.save")}
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
