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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Add } from "iconsax-react";
import ImageUpload from "@/components/ImageUpload";
import { generateRandomPassword } from "@/utils/generateRandomPassword";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const teacherSchema = (t) =>
  z.object({
    name: z.string().min(3, t("common.required")),
    email: z.string().email(t("common.invalidEmail")),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, t("common.invalidPhone")),
    assignedClass: z.string().min(1, t("common.required")).optional(),
    permissions: z.object({
      reportPedagogique: z.boolean().optional(),
      reportFinancial: z.boolean().optional(),
      reportHealth: z.boolean().optional(),
    }),
    image: z.any().optional(),
  });

export default function TeachersModal({
  onAddTeacher,
  onUpdateTeacher,
  editingTeacher = null,
  classes,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(teacherSchema(t)),
    defaultValues: {
      name: editingTeacher?.name || "",
      email: editingTeacher?.email || "",
      phone: editingTeacher?.phone || "",
      assignedClass: editingTeacher?.assignedClass?._id || "",
      permissions: editingTeacher?.permissions || {
        reportPedagogique: true,
        reportFinancial: true,
        reportHealth: true,
      },
      image: editingTeacher?.image || null,
    },
  });

  useEffect(() => {
    form.reset({
      name: editingTeacher?.name || "",
      email: editingTeacher?.email || "",
      phone: editingTeacher?.phone || "",
      assignedClass: editingTeacher?.assignedClass?._id || "",
      permissions: editingTeacher?.permissions || {
        reportPedagogique: true,
        reportFinancial: true,
        reportHealth: true,
      },
      image: editingTeacher?.image || null,
    });
  }, [editingTeacher, form]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("permissions", JSON.stringify(data.permissions || {}));
      if (data.assignedClass)
        formData.append("assignedClass", data.assignedClass);

      if (data.image && data.image instanceof File) {
        if (editingTeacher?.image) {
          formData.append("oldImage", editingTeacher.image);
        }
        formData.append("image", data.image);
      }
      if (!data.image && editingTeacher?.image) {
        formData.append("deleteImage", "true");
        formData.append("oldImage", editingTeacher.image);
      }

      if (editingTeacher) {
        await onUpdateTeacher(formData, editingTeacher._id);
      } else {
        formData.append("role", "teacher");
        formData.append("password", generateRandomPassword(12));
        await onAddTeacher(formData);
      }
      form.reset();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingTeacher ? (
          <Button
            variant="link"
            size="sm"
            className="text-primary hover:text-primary/80 p-1 underline h-auto text-xs sm:text-sm justify-start sm:justify-center"
          >
            {t("common.edit")}
          </Button>
        ) : (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 flex items-center gap-2">
            <Add size="20" color="currentColor" />
            {t("common.add")}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
        <DialogHeader className="border-b-2 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
              {editingTeacher
                ? t("teachers.editTeacher")
                : t("teachers.addTeacher")}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
          >
            {/* Tabs for Basic Info and Image */}
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full flex justify-between bg-transparent border-b border-border px-1">
                <TabsTrigger
                  value="basic"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("common.basicInfo")}
                </TabsTrigger>
                <TabsTrigger
                  value="permissions"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("common.permissions")}
                </TabsTrigger>
                <TabsTrigger
                  value="image"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("common.additionalInfo")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 pt-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">
                        {t("teachers.fullName")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="rtl:text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">
                        {t("teachers.email")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">
                        {t("teachers.phone")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* assignedClass */}
                <FormField
                  control={form.control}
                  name="assignedClass"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>{t("teachers.assignedClass")}</FormLabel>
                      {!classes || classes.length === 0 ? (
                        <Select disabled>
                          <FormControl>
                            <SelectTrigger className="rtl:text-right">
                              <SelectValue
                                placeholder={
                                  classes === undefined
                                    ? t("common.loading")
                                    : t("teachers.noClassesAvailable")
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                        </Select>
                      ) : (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rtl:text-right">
                              <SelectValue
                                placeholder={t("teachers.assignedClass")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls._id} value={cls._id}>
                                {cls.className}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Information */}
                {!editingTeacher && (
                  <div>
                    <div className="text-base font-medium text-muted-foreground">
                      {t("teachers.signInInfo")}
                    </div>
                    <div className="bg-muted/50 p-1 rounded-lg">
                      <div className="text-sm text-muted-foreground">
                        {t("teachers.signInDescription")}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4 pt-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium">
                      {t("settings.users.setPermissions")}
                    </h3>
                  </div>

                  {/* Pedagogical Report Permission */}
                  <FormField
                    control={form.control}
                    name="permissions.reportPedagogique"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>
                            {t("settings.users.reportPedagogical")}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value !== false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Financial Report Permission */}
                  <FormField
                    control={form.control}
                    name="permissions.reportFinancial"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>
                            {t("settings.users.reportFinancial")}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value !== false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Health Report Permission */}
                  <FormField
                    control={form.control}
                    name="permissions.reportHealth"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>
                            {t("settings.users.reportHealth")}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value !== false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="image" className="pt-4">
                <div className="text-base font-medium text-muted-foreground pb-2">
                  {t("teachers.image")}
                </div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </form>
        </Form>

        <DialogFooter>
          <div className="flex flex-col sm:flex-row w-full md:w-1/2 gap-3 pt-4">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={(editingTeacher && !form.formState.isDirty) || loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50"
            >
              {loading
                ? t("common.loading")
                : editingTeacher
                ? t("common.update")
                : t("common.save")}
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
