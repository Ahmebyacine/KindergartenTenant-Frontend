import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachersTable from "@/layouts/admin/teachers/TeachersTable";
import { toast } from "sonner";
import api from "@/services/api";
import { SearchNormal1 } from "iconsax-react";
import TeachersModal from "@/layouts/admin/teachers/TeachersModal";
import { Input } from "@/components/ui/input";

export default function Teachers() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const fetchTabs = async () => {
    try {
      const response = await api.get("/categories");
      const fetchedTabs = response.data.map((category) => ({
        id: category._id,
        label: category.name,
        name: category.name,
      }));

      setTabs(fetchedTabs);
      setActiveTab(fetchedTabs[0]?.id || null); // Set default active tab
    } catch (error) {
      console.error("Failed to fetch class categories:", error);
    }
  };

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch class categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Failed to fetch class categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabs();
    fetchTeachers();
    fetchClasses();
  }, []);

  const handleAddTeacher = async (data) => {
    setAddLoading(true);
    try {
      const response = await api.post("/users/teachers", data);
      setTeachers((prevTeachers) => [...prevTeachers, response.data]);
      toast("تمت إضافة معلم بنجاح!");
    } catch (error) {
      console.error("Error creating class", error);
    } finally {
      setAddLoading(false);
    }
  };
  // Filter cheacher
  const filteredTeachers = teachers.filter((teacher) => {
    return teacher?.assignedClass?.category === activeTab;
  });

  return (
    <div className="bg-background p-2 md:p-4">
      <div className="w-full mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Keep existing TabsList and TabsTrigger styles */}
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 gap-8 md:grid-cols-4 lg:grid-cols-6 border-b mb-2">
              {tabs.map((tab) => (
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
                    disabled={!teachers.length}
                  />
                </div>
              </div>
              <TeachersModal
                onAddTeacher={handleAddTeacher}
                classes={classes}
                loading={addLoading}
              />
            </div>
            <TeachersTable loading={loading} teachers={filteredTeachers} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
