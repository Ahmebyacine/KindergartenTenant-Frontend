import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassesTable from "@/layouts/admin/classes/ClassesTable";
import api from "@/services/api";
import ClassesModal from "@/layouts/admin/classes/ClassesModal";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-react";
import { toast } from "sonner";

export default function Classes() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
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
    try {
      const response = await api.get("/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch class categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabs();
    fetchClasses();
  }, []);
  const handleAddClass = async (data) => {
    setLoading(true);
    const payload = { ...data };
    if (payload.teacher === "") {
      delete payload.teacher;
    }
    try {
      const response = await api.post("/classes", payload);
      console.log(response.data);
      setClasses((prevClasses) => [...prevClasses, response.data]);
      toast("تمت إضافة القسم بنجاح!");
    } catch (error) {
      console.error("Error creating class", error);
    } finally {
      setLoading(false);
    }
  };
  // Filter cheacher
  const filteredClasses = classes.filter((classe) => {
    return classe?.category?._id === activeTab;
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
                    disabled={!filteredClasses.length}
                  />
                </div>
              </div>
              <ClassesModal onAddClass={handleAddClass} categories={tabs} />
            </div>
            <ClassesTable classes={filteredClasses} loading={loading} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
