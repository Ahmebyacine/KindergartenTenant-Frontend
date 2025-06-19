import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreVertical,
  Group,
} from "lucide-react";
import { Edit2, More, ProfileCircle, Setting2, Trash } from "iconsax-react";
import img from "@/assets/images/avatar.png";

export default function UsersSettings() {
  const users = [
    {
      name: "خديجة زروقي",
      email: "mouhamedoucef@gmail.com",
      role: "معلم", // Teacher
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "نوال بن عبد الله",
      email: "nawal@school.com",
      role: "معلم", // Teacher
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "يوسف علوان",
      email: "y.alwan@gmail.com",
      role: "مراقب", // Observer
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "محمد يوسف",
      email: "mouhamedoucef@gmail.com",
      role: "مدير", // Manager
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const permissions = [
    { task: "إضافة طفل جديد", teacher: false, observer: false, manager: true },
    {
      task: "تسجيل الحضور والغياب",
      teacher: true,
      observer: false,
      manager: true,
    },
    { task: "إرسال تقرير صحي", teacher: true, observer: false, manager: true },
    {
      task: "إرسال تقرير تربوي (بيداغوجي)",
      teacher: true,
      observer: false,
      manager: true,
    },
    {
      task: "عرض التقارير المالية",
      teacher: false,
      observer: false,
      manager: true,
    },
    { task: "إضافة مصروف", teacher: false, observer: false, manager: true },
  ];

  const getRoleTagColors = (role) => {
    switch (role) {
      case "معلم": // Teacher
        return "bg-primary/10 text-primary";
      case "مراقب": // Observer
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "مدير": // Manager
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          اعدادات الحسابات
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="البحث"
                className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-primary focus:border-primary text-right bg-background text-foreground"
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-border text-muted-foreground px-4 py-2 rounded-lg"
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلترة
            </Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5" />
            إنشاء حساب جديد
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {users.map((user, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-sm border border-border flex justify-between items-start text-right bg-card"
            >
              {/* User Info Section */}
              <div className="flex items-start">
                <div className="overflow-hidden rounded-full bg-primary/10 w-[50px] h-[50px]">
                  <img
                    src={img}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col mr-3">
                  <span className="text-sm font-medium text-foreground">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                  <span
                    className={`px-3 py-1 max-w-[60px] rounded-full text-xs font-medium ${getRoleTagColors(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Dropdown Menu Section */}
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:bg-muted"
                  >
                    <More
                      size={16}
                      color="var(--muted-foreground)"
                      className="rotate-90"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl bg-popover border-border">
                  <DropdownMenuItem>
                    <Button
                      className="w-full justify-start text-foreground hover:text-destructive border-b border-border"
                      variant="ghost"
                    >
                      <Edit2
                        size={10}
                        variant="Outline"
                        color="var(--foreground)"
                      />
                      <span>تغيير كلمة المرور</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      className="w-full justify-start text-foreground hover:text-destructive border-b border-border"
                      variant="ghost"
                    >
                      <Group
                        size={10}
                        variant="Outline"
                        color="var(--foreground)"
                      />
                      <span>تعديل الحساب</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      className="w-full justify-start text-destructive hover:text-destructive/80 border-b border-border"
                      variant="ghost"
                    >
                      <Trash size={10} variant="Outline" color="var(--destructive)" />
                      <span>حذف الحساب</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </section>

      {/* Permissions Management Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          إدارة الصلاحيات
        </h2>
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="grid grid-cols-4 text-right bg-muted border-b border-border py-3 px-4 font-semibold text-foreground">
            <div>المهمة</div>
            <div>المعلم</div>
            <div>المراقب</div>
            <div>المدير</div>
          </div>
          {permissions.map((perm, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 items-center py-3 px-4 ${
                index % 2 === 0 ? "bg-background" : "bg-muted"
              } border-b border-border last:border-b-0`}
            >
              <div className="text-foreground">{perm.task}</div>
              <div className="flex justify-start">
                <Switch
                  checked={perm.teacher}
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                />
              </div>
              <div className="flex justify-start">
                <Switch
                  checked={perm.observer}
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                />
              </div>
              <div className="flex justify-start">
                <Switch
                  checked={perm.manager}
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
