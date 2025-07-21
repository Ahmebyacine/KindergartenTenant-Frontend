import {
  CalendarSearch,
  Chart2,
  Danger,
  People,
  TickSquare,
} from "iconsax-react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import img from "@/assets/images/attendanceillu.png";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import api from "@/services/api";
import { formatDate } from "@/utils/dateFormatter";
import { toast } from "sonner";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import ScanAttendance from "@/components/attendance/ScanAttendance";
import ScanCheckOut from "@/components/attendance/ScanCheckOut";
import { attendanceStats } from "@/utils/attendanceStats";

export default function AttendanceTeacher() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  const { user } = useAuth();

  // fetch attendce
  useEffect(() => {
    const fetchAttendanceData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/attendances?date=${date}&classId=${user?.class?._id}`
        );
        setAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (date && user?.class?._id) {
      fetchAttendanceData();
    }
  }, [date, user?.class?._id]);

  const handleAttendanceCreate = async (data) => {
    try {
      if (Array.isArray(data.ids) && data.ids.length > 0) {
        const response = await api.post("/attendances/bulk", data);
        setAttendance((prev) => {
          // Create a map of new attendance records by student ID
          const newAttendanceMap = new Map();
          response.data.info.forEach((item) => {
            newAttendanceMap.set(item.student._id, {
              attendanceId: item._id,
              status: item.status,
              time: item.createdAt,
              checkInTime: item.checkInTime,
            });
          });

          // Update only affected students, preserve others
          const updatedInfo = prev.info.map((studentInfo) => {
            const newAttendance = newAttendanceMap.get(studentInfo.student._id);
            return newAttendance
              ? { ...studentInfo, ...newAttendance }
              : studentInfo;
          });

          return {
            ...prev,
            recorded: true,
            info: updatedInfo,
          };
        });
      } else {
        const response = await api.post("/attendances", {
          ...data,
          enrollmentId: data.ids,
        });
        setAttendance((prev) => {
          const index = prev.info.findIndex(
            (item) => item.enrollmentId === data.ids
          );

          const updatedInfo = [...prev.info];
          updatedInfo[index] = {
            ...updatedInfo[index],
            ...{
              attendanceId: response.data._id,
              status: response.data.status,
              time: response.data.createdAt,
              checkInTime: response.data.checkInTime,
            },
          };

          return {
            ...prev,
            recorded: true,
            info: updatedInfo,
          };
        });
      }
      toast.success("تم تسجيل الحضور بنجاح");
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تسجيل الحضور");
    }
  };

  const handleAttendanceCheckOut = async (data) => {
    try {
      if (Array.isArray(data) && data.length > 0) {
        const response = await api.patch("/attendances/check-out/bulk", data);
        console.log(response.data);
      } else {
        const response = await api.patch("/attendances/check-out", {
          ...data,
          enrollmentId: data,
        });
        setAttendance((prev) => {
          const index = prev.info.findIndex(
            (item) => item.attendanceId === response.data._id
          );

          const updatedInfo = [...prev.info];
          updatedInfo[index] = {
            ...updatedInfo[index],
            ...{ checkOutTime: response.data.checkOutTime },
          };

          return {
            ...prev,
            info: updatedInfo,
          };
        });
      }
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  const totals = attendanceStats(attendance?.info || []);

  const statsData = [
    {
      title: "عدد الأطفال",
      value: `${attendance?.info?.length || 0} طفل`,
      icon: People,
      bgColor: "bg-[#A2F4FD]",
      iconColor: "#00A6F4",
    },
    {
      title: "الحضور",
      value: `${totals?.presentCount || 0} حاضر`,
      icon: TickSquare,
      bgColor: "bg-[#B9F8CF]",
      iconColor: "#008236",
    },
    {
      title: "الغياب",
      value: `${totals?.absentCount || 0} غائب`,
      icon: Danger,
      bgColor: "bg-[#FFE2E2]",
      iconColor: "#E7000B",
    },
    {
      title: "نسبة الحضور",
      value: `${totals?.presentPercentage || 0}%`,
      icon: Chart2,
      bgColor: "bg-[#EDE9FE]",
      iconColor: "#7008E7",
    },
  ];
  return (
    <div className="bg-background p-6">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <div className="flex items-center gap-1 w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-32 justify-between font-normal"
                >
                  {date ? formatDate(date) : "Select date"}
                  <CalendarSearch color="currentColor" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex my-3 w-full sm:w-auto">
            <ScanAttendance onAttendanceCreate={handleAttendanceCreate} />
            <ScanCheckOut onAttendanceCheckOut={handleAttendanceCheckOut} />
          </div>
        </div>
        {date ? (
          <>
            {attendance.recorded && (
              <div className="w-full my-4 p-3">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="-ml-2 md:-ml-4 min-w-0">
                    {loading
                      ? Array(4)
                          .fill(null)
                          .map((_, idx) => (
                            <CarouselItem
                              key={idx}
                              className="pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                              <StatCard key={idx} loading={true} />
                            </CarouselItem>
                          ))
                      : statsData.map((stat, index) => (
                          <CarouselItem
                            key={index}
                            className="pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                          >
                            <StatCard stat={stat} />
                          </CarouselItem>
                        ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
            <AttendanceTable
              attendance={attendance.info}
              loading={loading}
              onAttendanceCreate={handleAttendanceCreate}
              onAttendanceCheckOut={handleAttendanceCheckOut}
              selectedDate={date}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-8">
              <img
                src={img}
                alt="Attendance management illustration"
                className="w-72 h-48 object-contain"
              />
            </div>
            <p className="text-center text-lg">
              يرجى اختيار التاريخ والفصل لعرض بيانات الحضور والغياب
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
