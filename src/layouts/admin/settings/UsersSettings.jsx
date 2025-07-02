import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Group } from "lucide-react";
import { Edit2, More, SearchNormal1, Trash } from "iconsax-react";
import img from "@/assets/images/avatar.png";
import UserModal from "./UserModal";
import api from "@/services/api";
import { toast } from "sonner";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "@/pages/Loading";
import UsersFilter from "./UsersFilter";

export default function UsersSettings() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddUser = async (userData) => {
    try {
      await api.post("/users", userData);
      toast.success("تم إضافة المستخدم بنجاح");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("فشل في إضافة المستخدم. يرجى المحاولة مرة أخرى.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("error in fetch the data");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
      case "teacher": // Teacher
        return "bg-primary/10 text-primary";
      case "supervisor": // Observer
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "admin": // Manager
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          اعدادات الحسابات
        </h2>
        <div className="flex items-center w-full gap-1 mb-8">
          <div className="w-2/3 md:w-full flex gap-1 items-center">
            <div className="relative w-2/3 md:w-1/3">
              <SearchNormal1
                size="16"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                color="currentColor"
              />
              <Input
                placeholder="البحث"
                className="pr-10 pl-4 py-2 bg-background"
                disabled={!users.length}
              />
            </div>
            <UsersFilter />
          </div>
          <UserModal onAddUser={handleAddUser} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {loading && (<Loading />)}
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
                <DropdownMenuContent
                  align="end"
                  className="w-48 rounded-xl bg-popover border-border"
                >
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
                      <Trash
                        size={10}
                        variant="Outline"
                        color="var(--destructive)"
                      />
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
