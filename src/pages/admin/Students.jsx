import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsTable from "@/components/students/StudentsTable";
import { SearchNormal1 } from "iconsax-react";
import StudentsModal from "@/components/students/StudentsModal";
import api from "@/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import StudentsFilter from "@/components/students/StudentsFilter";
import RegistrationsModal from "@/components/students/RegistrationsModal";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";
import { useAuth } from "@/contexts/AuthContext";
import { fetchTabs } from "@/api/categoriesApi";
import { fetchClasses } from "@/api/classesApi";
import { fetchStudents } from "@/api/studentsApi";
import { t } from "i18next";

export default function Students() {
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ classId: null, category: null });
  const { config } = useAuth();


  const { data: tabs, error: tabsError } = useFetch(fetchTabs);

  const {
    data: classes,
    loading: classesLoading,
    error: classesError,
  } = useFetch(fetchClasses);

  const {
    data: students,
    setData: setStudents,
    loading: studentsLoading,
    error: studentsError,
  } = useFetch(fetchStudents);

  useEffect(() => {
    if (tabs?.length) {
      setActiveTab(tabs[0]?.id);
    }
  }, [tabs]);

  const handleAddStudent = async (data) => {
  try {
    const response = await api.post("/students", data);
    setStudents((prev) => [response.data, ...prev]);
    toast.success(t("students.addSuccess"));
  } catch (error) {
    console.error("Error adding student:", error);
    toast.error(t("students.addError"), {
      description: t(
        `errorApi.${error?.response?.data?.message || "defaultError"}`
      ),
    });
  }
};

const handleRegistrationsStudent = async (data) => {
  try {
    const response = await api.post("/enrollments", data);
    setStudents((prev) => [...prev, response.data]);
    toast.success(t("students.registerSuccess"));
  } catch (error) {
    console.error("Error registering student:", error);
    toast.error(t("students.registerError"), {
      description: t(
        `errorApi.${error?.response?.data?.message || "defaultError"}`
      ),
    });
  }
};

const handleUpdateStudent = async (formData, studentId) => {
  try {
    const response = await api.put(`/students/${studentId}`, formData);
    const updatedData = response.data;

    setStudents((prev) =>
      prev.map((student) =>
        student._id === updatedData._id ? updatedData : student
      )
    );

    toast.success(t("students.updateSuccess"));
  } catch (error) {
    console.error("Error updating student:", error);
    toast.error(t("students.updateError"), {
      description: t(
        `errorApi.${error?.response?.data?.message || "defaultError"}`
      ),
    });
  }
};

const handleDeleteEnrollment = async (enrollmentId) => {
  try {
    await api.delete(`/enrollments/${enrollmentId}`);
    setStudents((prev) =>
      prev.filter((student) => student._id !== enrollmentId)
    );
    toast.success(t("students.deleteEnrollmentSuccess"));
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    toast.error(t("students.deleteEnrollmentError"), {
      description: t(
        `errorApi.${error?.response?.data?.message || "defaultError"}`
      ),
    });
  }
};

  const handleFilterStudents = (filters) => {
    setFilters(filters);
    if (filters.category) setActiveTab(filters.category);
  };

  const filteredStudents = useMemo(() => {
    let result = students || [];

    // Filter by tab (category)
    if (activeTab) {
      result = result.filter(
        (student) => student.class?.category === activeTab
      );
    }

    // Apply filters
    if (filters.classId) {
      result = result.filter(
        (student) => student.class?._id === filters.classId
      );
    }

    // Apply search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((s) => {
        const firstName = s.student?.firstName?.toLowerCase() || "";
        const lastName = s.student?.lastName?.toLowerCase() || "";
        const fullName = `${firstName} ${lastName}`;
        return (
          firstName.includes(q) || lastName.includes(q) || fullName.includes(q)
        );
      });
    }

    return result;
  }, [students, activeTab, filters, search]);

  if (tabsError || classesError || studentsError)
    return <ErrorPage error={tabsError || classesError || studentsError} />;

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
              <div className="flex items-center gap-3 w-full">
                <div className="relative w-full sm:w-64">
                  <SearchNormal1
                    size="16"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    color="currentColor"
                  />
                  <Input
                    placeholder={t("common.search")}
                    className="pr-10 pl-4 py-2 bg-background"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <StudentsFilter
                  classes={classes}
                  onFilter={handleFilterStudents}
                />
              </div>

              <div className="grid grid-cols-2 my-3 w-full md:max-w-3xs gap-4">
                <RegistrationsModal
                  classes={classes}
                  onRegistred={handleRegistrationsStudent}
                  isLimited={students.length >= config?.limits?.students}
                />
                <StudentsModal
                  classes={classes}
                  onAddStudent={handleAddStudent}
                  isLimited={students.length >= config?.limits?.students}
                />
              </div>
            </div>

            <StudentsTable
              loading={studentsLoading || classesLoading}
              students={filteredStudents}
              classes={classes}
              onUpdateStudent={handleUpdateStudent}
              onDeleteEnrollment={handleDeleteEnrollment}
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
