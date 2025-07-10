import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SearchNormal1 } from "iconsax-react";
import UserModal from "./UserModal";
import api from "@/services/api";
import { toast } from "sonner";
import UsersFilter from "./UsersFilter";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import UserCard from "./UserCars";
import { generateRandomPassword } from "@/utils/generateRandomPassword";

export default function UsersSettings() {
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  };
  const { data: users, setData: setUsers, loading } = useFetch(fetchUsers);

  const handleAddUser = async (userData) => {
    try {
      const response = await api.post("/users", userData);
      toast.success("تم إضافة المستخدم بنجاح");
      setUsers((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("فشل في إضافة المستخدم. يرجى المحاولة مرة أخرى.");
    }
  };
  const handleUpdateUser = async (userData) => {
    try {
      const response = await api.put(`/users/${userData._id}`, userData);
      toast.success("تم تحديث المستخدم بنجاح");
      setUsers((prevData) =>
        prevData.map((user) =>
          user._id === response.data._id ? response.data : user
        )
      );
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("فشل في تحديث المستخدم. يرجى المحاولة مرة أخرى.");
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("تم حذف المستخدم بنجاح");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("فشل في حذف المستخدم. حاول مرة أخرى.");
    }
  };
  const handleChangePassword = async (userId) => {
    try {
      await api.put(`/users/${userId}`, {
        password: generateRandomPassword(12),
      });

      toast.success("تم تغيير كلمة المرور بنجاح");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("فشل في تغيير كلمة المرور. حاول مرة أخرى.");
    }
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <UserCard key={index} loading />
              ))
            : users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onEdit={(user) => setEditingId(user._id)}
                  onDelete={(user) => handleDeleteUser(user._id)}
                  onChangePassword={(user) => handleChangePassword(user._id)}
                />
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
      {editingId && (
        <UserModal
          open={!!editingId}
          onOpenChange={(open) => !open && setEditingId(null)}
          onUpdateUser={handleUpdateUser}
          editingUser={users.find((user) => user._id === editingId)}
        />
      )}
    </div>
  );
}
