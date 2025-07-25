import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Briefcase, Trash2, Upload } from "lucide-react";
import img from "@/assets/images/avatar.png";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل" }),
  email: z.string().email({ message: "بريد إلكتروني غير صالح" }),
  phone: z.string()
    .min(10, { message: "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل" })
    .regex(/^[0-9]+$/, { message: "يجب أن يتكون رقم الهاتف من أرقام فقط" })
    .optional(),
});

export default function PersonalSettings() {
  const { user,setUser } = useAuth();
  const [preview, setPreview] = useState(user?.image ? import.meta.env.VITE_API_URL_PICTURE + user?.image : img);
  const [file, setFile] = useState(null);
  const [deleteImage, setDeleteImage] = useState(false);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    }
  });

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setDeleteImage(false);
      setPreview(URL.createObjectURL(selected));
      form.setValue("image", selected, { shouldDirty: true });
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
    setDeleteImage(true);
    setPreview(img);
    form.setValue("image", null, { shouldDirty: true });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone || "");
      if (file) {
        formData.append("image", file);
        if (user?.image) {
        formData.append("oldImage", user?.image);
        }
      }
      if (deleteImage) {
        formData.append("deleteImage", "true");
        formData.append("oldImage", user?.image);
      }
      const response = await api.put("/auth/update-info", formData);
      setUser(response.data);
      toast.success("تم تحديث الحساب بنجاح");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تحديث البيانات");
    }
  };

  return (
    <div className="bg-background">
      <div className="w-full bg-card rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 px-6 mb-4 border-b border-border">
          <h1 className="text-lg font-semibold">الحساب الشخصي</h1>
        </div>
        
        <Form {...form}>
          <div className="w-full flex flex-col items-center md:flex-row">
            {/* Profile Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center py-8 px-6">
              <div className="relative mb-4">
                <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-border shadow-lg">
                  <img
                    src={preview}
                    alt="Profile Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="button" onClick={() => fileInputRef.current.click()} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> تغيير الصورة
                </Button>
                { (user?.image || file) && (
                  <Button type="button" variant="destructive" onClick={handleDeleteImage} className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" /> حذف
                  </Button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Form Fields */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-1/2 px-6 pb-8 space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      الاسم الكامل
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel className="text-muted-foreground text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-muted-foreground text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      رقم الهاتف
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  الدور
                </Label>
                <Input value={user?.role} disabled />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={!form.formState.isDirty}>
                  حفظ التغييرات
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
}