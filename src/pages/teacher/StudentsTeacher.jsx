import { useMemo, useState } from "react";
import StudentsTable from "@/components/students/StudentsTable";
import { SearchNormal1 } from "iconsax-react";
import StudentsModal from "@/components/students/StudentsModal";
import api from "@/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import StudentsFilter from "@/components/students/StudentsFilter";
import RegistrationsModal from "@/components/students/RegistrationsModal";
import { useAuth } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";
import { fetchStudents } from "@/api/studentsApi";

export default function StudentsTeacher() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { config } = useAuth();

  const {
    data: students,
    setData: setStudents,
    loading,
    error,
  } = useFetch(fetchStudents);

  const handelAddStudent = async (data) => {
    try {
      const response = await api.post("/students", data);
      setStudents((prev) => [...prev, response.data]);
      toast("تمت إضافة الطفل بنجاح!");
    } catch (error) {
      console.error("Error creating student", error);
    }
  };

  const handleRegistrationsStudent = async (data) => {
    try {
      const response = await api.post("/enrollments", data);
      setStudents((prev) => [...prev, response.data]);
      toast.success("تمت تسجيل الطفل بنجاح!");
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("فشل في تسجيل الطفل");
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

  const handleDeleteEnrollment = async (enrollmentId) => {
    try {
      await api.delete(`/enrollments/${enrollmentId}`);
      setStudents((prev) =>
        prev.filter((student) => student._id !== enrollmentId)
      );
      toast.success("تم حذف تسجيل الطفل بنجاح!");
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      toast.error("فشل في حذف تسجيل الطفل");
    }
  };

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;

    return students.filter((s) => {
      const firstName = s.student?.firstName?.toLowerCase() || "";
      const lastName = s.student?.lastName?.toLowerCase() || "";
      const fullName = `${firstName} ${lastName}`;

      return (
        firstName.includes(search.toLowerCase()) ||
        lastName.includes(search.toLowerCase()) ||
        fullName.includes(search.toLowerCase())
      );
    });
  }, [students, search]);

  if (error) return <ErrorPage error={error} />;

  return (
    <div className="bg-background px-6">
      <div className="w-full mx-auto space-y-6">
        <div className="flex flex-col pt-2">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="flex items-center gap-1 w-full">
              <div className="relative w-full sm:w-64">
                <SearchNormal1
                  size="16"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  color="currentColor"
                />
                <Input
                  placeholder="البحث عن اسم الطفل"
                  className="pr-10 pl-4 py-2 bg-background"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <StudentsFilter classes={[user?.assignedClass]} />
            </div>
            <div className="grid grid-cols-2 my-3 w-full md:max-w-3xs gap-4">
              <RegistrationsModal
                classes={[user?.assignedClass]}
                onRegistred={handleRegistrationsStudent}
                isLimited={students.length >= config?.limits?.students}
              />
              <StudentsModal
                classes={[user?.assignedClass]}
                onAddStudent={handelAddStudent}
                isLimited={students.length >= config?.limits?.students}
              />
            </div>
          </div>

          <StudentsTable
            loading={loading}
            students={filteredStudents}
            classes={[user?.assignedClass]}
            onUpdateStudent={handleUpdateStudent}
            onDeleteEnrollment={handleDeleteEnrollment}
          />
        </div>
      </div>
    </div>
  );
}
