import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachersTable from "@/layouts/admin/teachers/TeachersTable";
import { toast } from "sonner";
import api from "@/api";
import { SearchNormal1 } from "iconsax-react";
import TeachersModal from "@/layouts/admin/teachers/TeachersModal";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";
import { fetchClasses } from "@/api/classesApi";
import { fetchTabs } from "@/api/categoriesApi";
import { fetchTeachers } from "@/api/usersApi";

export default function Teachers() {
  const [addLoading, setAddLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");


  const { data: tabs, error: tabsError } = useFetch(fetchTabs);

  const {
    data: teachers,
    setData: setTeachers,
    loading: teachersLoading,
    error: teachersError,
  } = useFetch(fetchTeachers);

  const {
    data: classes,
    loading: classesLoading,
    error: classesError,
  } = useFetch(fetchClasses);

  useEffect(() => {
    if (tabs?.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  const handleAddTeacher = async (data) => {
    setAddLoading(true);
    try {
      const res = await api.post("/users", data);
      setTeachers((prev) => [res.data, ...prev]);
      toast.success("تمت إضافة معلم بنجاح!");
    } catch (error) {
      console.error("Error creating teacher", error);
      toast.error("حدث خطأ أثناء الإضافة");
    } finally {
      setAddLoading(false);
    }
  };

  const handleUpdateTeacher = async (formData, id) => {
    try {
      const res = await api.put(`/users/${id}`, formData);
      setTeachers((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
      toast.success("تم التحديث بنجاح");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setTeachers((prev) => prev.filter((item) => item._id !== id));
      toast.success("تم الحذف بنجاح");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  const filteredTeachers = useMemo(() => {
    if (!search.trim())
      return (
        teachers?.filter(
          (teacher) => teacher?.assignedClass?.category === activeTab
        ) || []
      );

    return teachers.filter((teacher) => {
      const name = teacher.name?.toLowerCase() || "";
      return name.includes(search.toLowerCase()) || "";
    });
  }, [teachers, search, activeTab]);

  if (tabsError || teachersError || classesError)
    return <ErrorPage error={tabsError || teachersError || classesError} />;

  return (
    <div className="bg-background p-2 md:p-4">
      <div className="w-full mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 gap-8 md:grid-cols-4 lg:grid-cols-6 border-b mb-2">
              {tabs?.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex justify-between mb-4">
              <div className="w-2/3 md:w-full flex gap-1 items-center">
                <div className="relative">
                  <SearchNormal1
                    size="16"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    color="currentColor"
                  />
                  <Input
                    placeholder="البحث"
                    className="pr-10 pl-4 py-2 bg-background"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <TeachersModal
                onAddTeacher={handleAddTeacher}
                classes={classes}
                loading={addLoading}
              />
            </div>

            <TeachersTable
              loading={teachersLoading || classesLoading}
              teachers={filteredTeachers}
              classes={classes}
              onUpdateTeacher={handleUpdateTeacher}
              onDeleteTeacher={handleDeleteTeacher}
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
