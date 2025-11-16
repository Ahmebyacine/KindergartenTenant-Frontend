import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchNormal1, UserRemove } from "iconsax-react";
import UserModal from "./UserModal";
import api from "@/api";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";
import UserCard from "./UserCars";
import { generateRandomPassword } from "@/utils/generateRandomPassword";
import { fetchUsers } from "@/api/usersApi";
import { useAuth } from "@/contexts/AuthContext";
import { t } from "i18next";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersSettings() {
  const [editingId, setEditingId] = useState(null);
  const { config } = useAuth();

  const {
    data: users,
    setData: setUsers,
    loading,
    error,
  } = useFetch(fetchUsers);

  const handleAddUser = async (userData) => {
    try {
      const response = await api.post("/users", userData);
      toast.success(t("settings.users.addSuccess"));
      setUsers((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(
        t("settings.users.addError", {
          description: t(
            `errorApi.${error.response?.data?.error || "defaultError"}`
          ),
        })
      );
    }
  };
  const handleUpdateUser = async (userData, id) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      toast.success(t("settings.users.updateSuccess"));
      setUsers((prevData) =>
        prevData.map((user) =>
          user._id === response.data._id ? response.data : user
        )
      );
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(
        t("settings.users.updateError", {
          description: t(
            `errorApi.${error.response?.data?.error || "defaultError"}`
          ),
        })
      );
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(t("settings.users.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(
        t("settings.users.deleteError", {
          description: t(
            `errorApi.${error.response?.data?.error || "defaultError"}`
          ),
        })
      );
    }
  };
  const handleChangePassword = async (userId) => {
    try {
      await api.put(`/users/${userId}`, {
        password: generateRandomPassword(12),
      });

      toast.success(t("settings.users.changePasswordSuccess"));
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        t("settings.users.changePasswordError", {
          description: t(
            `errorApi.${error.response?.data?.error || "defaultError"}`
          ),
        })
      );
    }
  };

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {t("settings.users.title")}
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
                placeholder={t("common.search")}
                className="pr-10 pl-4 py-2 bg-background"
                disabled={!users.length}
              />
            </div>
          </div>
          <UserModal
            onAddUser={handleAddUser}
            isLimited={users.length >= config?.limits?.users}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {loading || error ? (
            Array.from({ length: 4 }).map((_, index) => (
              <UserCard key={index} loading={loading} error={error} />
            ))
          ) : users.length === 0 ? (
            <Card className="col-start-2">
              <CardContent className="flex flex-col items-center gap-5">
                <UserRemove color="currentColor" size={34} />
                {t("settings.users.noUsers")}
              </CardContent>
            </Card>
          ) : (
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onEdit={(user) => setEditingId(user._id)}
                onDelete={(user) => handleDeleteUser(user._id)}
                onChangePassword={(user) => handleChangePassword(user._id)}
              />
            ))
          )}
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
