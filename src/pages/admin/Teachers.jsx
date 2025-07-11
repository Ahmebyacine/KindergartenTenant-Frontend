import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachersTable from "@/layouts/admin/teachers/TeachersTable";
import { toast } from "sonner";
import api from "@/services/api";
import { SearchNormal1 } from "iconsax-react";
import TeachersModal from "@/layouts/admin/teachers/TeachersModal";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";

export default function Teachers() {
  const fetchTabs = async () => {
    const res = await api.get("/categories");
    return res.data.map((category) => ({
      id: category._id,
      label: category.name,
      name: category.name,
    }));
  };

  const fetchTeachers = async () => {
    const res = await api.get("/users/teachers");
    return res.data;
  };

  const fetchClasses = async () => {
    const res = await api.get("/classes");
    return res.data;
  };

  const { data: tabs } = useFetch(fetchTabs);

  const {
    data: teachers,
    setData: setTeachers,
    loading: teachersLoading,
  } = useFetch(fetchTeachers);

  const { data: classes, loading: classesLoading } = useFetch(fetchClasses);

  const [addLoading, setAddLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (tabs?.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  const handleAddTeacher = async (data) => {
    setAddLoading(true);
    try {
      const res = await api.post("/users/teachers", data);
      setTeachers((prev) => [...prev, res.data]);
      toast.success("تمت إضافة معلم بنجاح!");
    } catch (error) {
      console.error("Error creating teacher", error);
      toast.error("حدث خطأ أثناء الإضافة");
    } finally {
      setAddLoading(false);
    }
  };

  const handleUpdateTeacher = async (updatedItem) => {
    try {
      const res = await api.put(`/users/${updatedItem._id}`, updatedItem);
      setTeachers((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? res.data : item))
      );
      toast.success("تم التحديث بنجاح");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const filteredTeachers =
    teachers?.filter(
      (teacher) => teacher?.assignedClass?.category === activeTab
    ) || [];

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

            <div className="flex justify-between">
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
                    disabled={!teachers?.length}
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
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
