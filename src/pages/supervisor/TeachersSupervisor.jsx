import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachersTable from "@/layouts/supervisor/teachers/TeachersTable";
import { SearchNormal1 } from "iconsax-react";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";
import { fetchTabs } from "@/api/categoriesApi";
import { fetchTeachers } from "@/api/usersApi";
import { t } from "i18next";

export default function TeachersSupervisor() {
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch dynamic tabs
  const { data: tabsData, error: tabsError } = useFetch(fetchTabs);

  // Add static tab for "No Assigned Teacher"
  const tabs = useMemo(() => {
    return [
      ...tabsData,
      { id: "no-assigned", label: t("teachers.noAssigned") },
    ];
  }, [tabsData]);


  const { data: teachers, loading, error: teachersError } = useFetch(fetchTeachers);

  useEffect(() => {
    if (tabs?.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  const filteredTeachers = useMemo(() => {
    if (!search.trim())
      return teachers?.filter((teacher) => {
        if (activeTab === "no-assigned") {
          return !teacher?.assignedClass;
        }
        return teacher?.assignedClass?.category === activeTab;
      }) || [];

    return teachers.filter((teacher) => {
      const name = teacher.name?.toLowerCase() || "";
      return name.includes(search.toLowerCase());
    });
  }, [teachers, search, activeTab]);

  if (tabsError || teachersError) {
    return <ErrorPage error={tabsError || teachersError} />;
  }

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
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <SearchNormal1
                  size="16"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  color="currentColor"
                />
                <Input
                  placeholder={t("common.search")}
                  className="pr-10 pl-4 py-2 w-64 border border-border rounded-lg rtl:text-right bg-background"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
