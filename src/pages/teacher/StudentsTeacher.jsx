import StudentsTable from "@/components/students/StudentsTable";
import { SearchNormal1 } from "iconsax-react";
import StudentsModal from "@/components/students/StudentsModal";
import api from "@/services/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import StudentsFilter from "@/components/students/StudentsFilter";
import RegistrationsModal from "@/components/students/RegistrationsModal";
import { useAuth } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";

export default function StudentsTeacher() {
  const { user } = useAuth();

  const fetchStudents = async () => {
    const res = await api.get("/enrollments");
    return res.data.data;
  };

  const {
    data: students,
    setData: setStudents,
    loading,
  } = useFetch(fetchStudents);

  const handelAddStudent = async (data) => {
    try {
      const response = await api.post("/students", data);
      setStudents((prevTeachers) => [...prevTeachers, response.data]);
      toast("تمت إضافة الطفل بنجاح!");
    } catch (error) {
      console.error("Error creating class", error);
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
                  placeholder="البحث"
                  className="pr-10 pl-4 py-2 bg-background"
                  disabled={!students.length}
                />
              </div>
              <StudentsFilter classes={[user.class]} />
            </div>
            <div className="flex my-3 w-full sm:w-auto">
              <RegistrationsModal
                classes={[user.class]}
                onRegistred={handleRegistrationsStudent}
              />
              <StudentsModal
                classes={[user.class]}
                onAddStudent={handelAddStudent}
              />
            </div>
          </div>
          <StudentsTable
            loading={loading}
            students={students}
            classes={[user.class]}
            onUpdateStudent={handleUpdateStudent}
          />
        </div>
      </div>
    </div>
  );
}
