import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachersTable from "@/layouts/supervisor/teachers/TeachersTable";
import api from "@/services/api";
import { SearchNormal1 } from "iconsax-react";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";

export default function TeachersSupervisor() {
  const [activeTab, setActiveTab] = useState(null);

  const fetchTabs = async () => {
    const response = await api.get("/categories");
    return response.data.map((category) => ({
      id: category._id,
      label: category.name,
      name: category.name,
    }));
  };

  const fetchTeachers = async () => {
    const response = await api.get("/users/teachers");
    return response.data;
  };

  const { data: tabs } = useFetch(fetchTabs);

  const { data: teachers, loading } = useFetch(fetchTeachers);

   useEffect(() => {
      if (tabs?.length > 0) {
        setActiveTab(tabs[0].id);
      }
    }, [tabs]);
  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    return teacher?.assignedClass?.category === activeTab;
  });

  return (
    <div className="bg-background p-6">
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
            <div className="flex justify-between items-center">
              <div className="relative">
                <SearchNormal1
                  size="16"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  color="currentColor"
                />
                <Input
                  placeholder="البحث"
                  className="pr-10 pl-4 py-2 w-64 border border-border rounded-lg text-right bg-background"
                  disabled={!teachers.length}
                />
              </div>
            </div>
            <TeachersTable loading={loading} teachers={filteredTeachers} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
