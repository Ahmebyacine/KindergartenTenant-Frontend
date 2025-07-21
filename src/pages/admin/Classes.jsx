import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassesTable from "@/layouts/admin/classes/ClassesTable";
import api from "@/services/api";
import ClassesModal from "@/layouts/admin/classes/ClassesModal";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-react";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";

export default function Classes() {
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");
  // Fetch Functions
  const fetchTabs = async () => {
    const response = await api.get("/categories");
    return response.data.map((category) => ({
      id: category._id,
      label: category.name,
      name: category.name,
    }));
  };

  const fetchClasses = async () => {
    const response = await api.get("/classes");
    return response.data;
  };
  // useFetch Hooks
  const { data: tabs,error: tabsError } = useFetch(fetchTabs);

  const {
    data: classes,
    setData: setClasses,
    loading: classesLoading,
    error: classesError,
  } = useFetch(fetchClasses);

  useEffect(() => {
    if (tabs?.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  // Handlers
  const handleAddClass = async (data) => {
    try {
      const response = await api.post("/classes", data);
      setClasses((prev) => [...prev, response.data]);
      toast.success("تمت إضافة القسم بنجاح!");
    } catch (error) {
      console.error("Error creating class", error);
      toast.error("حدث خطأ أثناء إضافة القسم");
    }
  };

  const handleUpdateClass = async (updatedItem) => {
    const payload = { ...updatedItem };
    if (payload.teacher === "") {
      delete payload.teacher;
    }

    try {
      const response = await api.put(`/classes/${updatedItem._id}`, payload);
      setClasses((prev) =>
        prev.map((item) =>
          item._id === updatedItem._id ? response.data : item
        )
      );
      toast.success("تم التحديث بنجاح");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  const filteredClasses = useMemo(() => {
    if (!search.trim())
      return (
        classes?.filter((classe) => classe?.category?._id === activeTab) || []
      );

    return classes.filter((cls) => {
      const name = cls.className?.toLowerCase() || "";
      return name.includes(search.toLowerCase()) || "";
    });
  }, [classes, search, activeTab]);

  if (tabsError || classesError) return <ErrorPage error={tabsError || classesError} />;

  return (
    <div className="bg-background p-6">
      <div className="w-full mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}k
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

            <div className="flex justify-between my-3">
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
              <ClassesModal onAddClass={handleAddClass} categories={tabs} />
            </div>

            <ClassesTable
              classes={filteredClasses}
              loading={classesLoading}
              categories={tabs}
              onUpdateClass={handleUpdateClass}
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
