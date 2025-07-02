import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsTable from "@/components/students/StudentsTable";
import { SearchNormal1 } from "iconsax-react";
import StudentsModal from "@/components/students/StudentsModal";
import api from "@/services/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import StudentsFilter from "@/components/students/StudentsFilter";
import RegistrationsModal from "@/components/students/RegistrationsModal";
import useFetch from "@/hooks/useFetch";

export default function Students() {
  const [activeTab, setActiveTab] = useState(null);

  const fetchTabs = async () => {
    const res = await api.get("/categories");
    return res.data.map((cat) => ({
      id: cat._id,
      label: cat.name,
      name: cat.name,
    }));
  };

  const fetchClasses = async () => {
    const res = await api.get("/classes");
    return res.data;
  };

  const fetchStudents = async () => {
    const res = await api.get("/enrollments");
    return res.data.data;
  };

  const { data: tabs } = useFetch(fetchTabs);

  const { data: classes, loading: classesLoading } = useFetch(fetchClasses);

  const {
    data: students,
    setData: setStudents,
    loading: studentsLoading,
  } = useFetch(fetchStudents);


  useEffect(() => {
    if (tabs?.length) {
      setActiveTab(tabs[0]?.id);
    }
  }, [tabs]);

  const handleAddStudent = async (data) => {
    try {
      const response = await api.post("/students", data);
      setStudents((prev) => [...prev, response.data]);
      toast.success("تمت إضافة الطفل بنجاح!");
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("فشل في إضافة الطفل");
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      const response = await api.put(
        `/students/${updatedStudent.student._id}`,
        updatedStudent
      );
      const updatedData = response.data;

      setStudents((prev) =>
        prev.map((student) =>
          student._id === updatedData._id ? updatedData : student
        )
      );

      toast.success("تم تحديث بيانات الطفل بنجاح!");
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("فشل في تحديث بيانات الطفل");
    }
  };

  const filteredStudents =
    students?.filter((student) => student?.class?.category === activeTab) || [];

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

            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="flex items-center gap-1 w-full">
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

              <div className="flex my-3 w-full sm:w-auto">
                <RegistrationsModal
                  classes={classes}
                />
                <StudentsModal
                  classes={classes}
                  onAddStudent={handleAddStudent}
                />
              </div>
            </div>

            <StudentsTable
              loading={studentsLoading || classesLoading}
              students={filteredStudents}
              classes={classes}
              onUpdateStudent={handleUpdateStudent}
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
