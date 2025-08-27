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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Add } from "iconsax-react";
import ImageUpload from "@/components/ImageUpload";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { t } from "i18next";

// Updated student schema to match backend model
const studentSchema = (t) => z.object({
  firstName: z.string().min(1, t("common.required")),
  lastName: z.string().min(1, t("common.required")),
  birthDate: z.string().min(1, t("common.required")),
  parentEmail: z.string().email(t("common.invalidEmail")).min(1, t("common.required")),
  class: z.string().min(1, t("common.required")),
  parentName: z.string().min(1, t("common.required")),
  parentContact: z.string().min(1, t("common.required")),
  bloodGroup: z.string().optional(),
  image: z.any().optional(),
});

export default function StudentsModal({
  onAddStudent,
  onUpdateStudent,
  editingStudent = null,
  classes,
  isLimited = false,
}) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(studentSchema(t)),
    defaultValues: {
      firstName: editingStudent?.student?.firstName || "",
      lastName: editingStudent?.student?.lastName || "",
      birthDate: editingStudent?.student?.birthDate?.split("T")[0] || "",
      parentEmail: editingStudent?.student?.parents?.email || "",
      parentName: editingStudent?.student?.parents?.name || "",
      parentContact: editingStudent?.student?.parents?.contact || "",
      class: editingStudent?.class?._id || "",
      bloodGroup: editingStudent?.student?.bloodGroup || "",
      image: editingStudent?.student?.image || null,
    },
  });

  useEffect(() => {
    form.reset({
      firstName: editingStudent?.student?.firstName || "",
      lastName: editingStudent?.student?.lastName || "",
      birthDate: editingStudent?.student?.birthDate?.split("T")[0] || "",
      parentEmail: editingStudent?.student?.parents?.email || "",
      parentName: editingStudent?.student?.parents?.name || "",
      parentContact: editingStudent?.student?.parents?.contact || "",
      class: editingStudent?.class?._id || "",
      bloodGroup: editingStudent?.student?.bloodGroup || "",
      image: editingStudent?.student?.image || null,
    });
  }, [editingStudent, form]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("birthDate", data.birthDate);
    formData.append("class", data.class);
    formData.append("parentName", data.parentName);
    formData.append("parentEmail", data.parentEmail);
    formData.append("parentContact", data.parentContact);

    if (data.bloodGroup) {
      formData.append("bloodGroup", data.bloodGroup);
    }
    if (data.image && data.image instanceof File) {
      if (editingStudent?.student?.image) {
        formData.append("oldImage", editingStudent.student.image);
      }
      formData.append("image", data.image);
    }
    // Handle image deletion
    if (!data.image && editingStudent?.student?.image) {
      formData.append("deleteImage", "true");
      formData.append("oldImage", editingStudent.student.image);
    }
    if (editingStudent) {
      await onUpdateStudent(formData, editingStudent?.student?._id);
    } else {
      await onAddStudent(formData);
    }
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editingStudent ? (
          <Button
            variant="ghost"
            className="text-primary underline p-1 h-auto font-medium m-0"
          >
            {t("common.edit")}
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              if (isLimited) {
                e.preventDefault();
                toast.error(t("students.limitReached"));
              }
            }}
            className={`${
              isLimited
                ? "bg-primary/30 hover:bg-primary/20 cursor-not-allowed"
                : ""
            } rounded-lg px-6 py-2 flex items-center gap-2 w-full sm:w-auto`}
          >
            <Add size="16" color="currentColor" />
            {t("students.addChild")}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
        <DialogHeader className="border-b-2 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
              {editingStudent ? t("students.editChild") : t("students.addChild")}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-h-[70vh] overflow-y-auto pt-2 px-1 sm:px-2"
          >
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full flex justify-between bg-transparent border-b border-border px-1">
                <TabsTrigger
                  value="basic"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("students.basicInfo")}
                </TabsTrigger>
                <TabsTrigger
                  value="additional"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("students.additionalInfo")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          {t("students.firstName")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="rtl:text-right" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          {t("students.lastName")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="rtl:text-right" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birth Date */}
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          {t("students.birthDate")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="rtl:justify-end"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Class Select */}
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          {t("students.class")}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rtl:text-right">
                              <SelectValue placeholder={t("students.selectClass")} />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Blood Group */}
                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">
                          {t("students.bloodGroup")}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("students.selectBloodGroup")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Parent Information */}
                <div className="space-y-4 pt-2">
                  <div className="text-base font-medium text-muted-foreground">
                    {t("students.parent")}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-muted-foreground">
                            {t("students.parentName")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="rtl:text-right" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="parentContact"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-muted-foreground">
                            {t("students.parentContact")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* parentEmail */}
                    <FormField
                      control={form.control}
                      name="parentEmail"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-muted-foreground">
                            {t("students.parentEmail")}
                          </FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="additional" className="pt-4">
                <div className="text-base font-medium text-muted-foreground pb-2">
                  {t("students.image")}
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
          <div className="flex w-full md:w-1/2 gap-3 pt-4">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={editingStudent && !form.formState.isDirty}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50"
            >
              {editingStudent ? t("common.update") : t("common.save")}
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
