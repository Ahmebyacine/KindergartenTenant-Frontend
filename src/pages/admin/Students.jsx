import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsTable from "@/layouts/admin/students/StudentsTable";
import { SearchNormal1 } from "iconsax-react";
import StudentsModal from "@/layouts/admin/students/StudentsModal";
import api from "@/services/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import StudentsFilter from "@/layouts/admin/students/StudentsFilter";
import RegistrationsModal from "@/layouts/admin/students/RegistrationsModal";

export default function Students() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTabs = async () => {
    try {
      const response = await api.get("/categories");
      const fetchedTabs = response.data.map((category) => ({
        id: category._id,
        label: category.name,
        name: category.name,
      }));

      setTabs(fetchedTabs);
      setActiveTab(fetchedTabs[0]?.id || null);
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
    }
  };
  const fetchStudents = async () => {
    try {
      const response = await api.get("/enrollments");
      setStudents(response.data.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  // Fetch All Data from API
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchTabs(), fetchClasses(), fetchStudents()]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handelAddStudent = async (data) => {
    try {
      const response = await api.post("/students", data);
      setStudents((prevTeachers) => [...prevTeachers, response.data]);
      toast("تمت إضافة الطفل بنجاح!");
    } catch (error) {
      console.error("Error creating class", error);
    }
  };

  // Filter students by selected tab/category
  const filteredStudents = students.filter((student) => {
    return student?.class?.category === activeTab;
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <SearchNormal1
                    size="16"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    color="currentColor"
                  />
                  <Input
                    placeholder="البحث"
                    className="pr-10 pl-4 py-2 bg-background"
                    disabled={!filteredStudents.length}
                  />
                </div>
                <StudentsFilter classes={classes} />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
                <StudentsModal
                  classes={classes}
                  onAddStudent={handelAddStudent}
                />
              </div>
            </div>
            <StudentsTable loading={loading} students={filteredStudents} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
