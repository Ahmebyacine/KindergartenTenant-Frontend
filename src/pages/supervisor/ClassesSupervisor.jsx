import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-react";
import ClassesTable from "@/layouts/supervisor/classes/ClassesTable";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";
import { fetchTabs } from "@/api/categoriesApi";
import { fetchClasses } from "@/api/classesApi";
import { t } from "i18next";

export default function ClassesSupervisor() {
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");

  const { data: tabs, error: tabsError } = useFetch(fetchTabs);
  const { data: classes, loading, error: classesError } = useFetch(fetchClasses);

  useEffect(() => {
    if (tabs?.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  // Filter classes
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

  if (tabsError || classesError) {
    return <ErrorPage error={tabsError || classesError} />;
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
            <div className="flex justify-between items-center my-2">
              <div className="relative">
                <SearchNormal1
                  size="16"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  color="currentColor"
                />
                <Input
                  placeholder={t("common.search")}
                  className="pr-10 pl-4 py-2 w-64 border border-border rounded-lg bg-background"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <ClassesTable classes={filteredClasses} loading={loading} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
