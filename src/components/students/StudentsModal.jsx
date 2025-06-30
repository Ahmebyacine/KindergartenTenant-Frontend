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

// Updated student schema to match backend model
const studentSchema = z.object({
  firstName: z.string().min(1, "مطلوب"),
  lastName: z.string().min(1, "مطلوب"),
  birthDate: z.string().min(1, "مطلوب"),
  parentEmail: z.string().email("بريد غير صالح").min(1, "مطلوب"),
  class: z.string().min(1, "مطلوب"),
  parentName: z.string().min(1, "مطلوب"),
  parentContact: z.string().min(1, "مطلوب"),
  image: z.any().optional(),
});

export default function StudentsModal({ onAddStudent, classes }) {
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      parentEmail: "",
      class: "",
      parentName: "",
      parentContact: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    // Prepare data for API
    const parentData = {
      name: data.parentName,
      email: data.parentEmail,
      contact: data.parentContact,
    };
    const studentData = {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate).toISOString(),
      parents: parentData,
      class: data.class,
    };

    onAddStudent(studentData);
    form.reset();
  };

  return (
    <div className="bg-background data-[state=open]:px-4 px-2 w-full flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 flex items-center gap-2 w-full sm:w-auto">
            <Add size="16" color="currentColor" />
            اضافة طفل
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-full sm:max-w-2xl bg-card p-2 sm:p-6 rounded-lg sm:rounded-2xl overflow-y-auto">
          <DialogHeader className="border-b-2 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground rtl:text-right ltr:text-left w-full">
                إضافة طفل جديد
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
                    معلومات أساسية
                  </TabsTrigger>
                  <TabsTrigger
                    value="additional"
                    className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                  >
                    معلومات إضافية
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
                            الاسم الأول
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="text-right" />
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
                            الاسم الأخير
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="text-right" />
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
                            تاريخ الميلاد
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="text-right"
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
                            الفصل
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-right">
                                <SelectValue placeholder="اختر الفصل" />
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
                  </div>

                  {/* Parent Information */}
                  <div className="space-y-4 pt-2">
                    <div className="text-base font-medium text-muted-foreground">
                      ولي الأمر
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="parentName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-muted-foreground">
                              اسم ولي الأمر
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="text-right" />
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
                              رقم التواصل
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="text-right" />
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
                              البريد الإلكتروني
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="parentEmail"
                                dir="ltr"
                                {...field}
                                className="text-right"
                              />
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
                    صورة الطالب (اختياري)
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
