import { ChevronLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import {
  CalendarSearch,
  Chart2,
  Danger,
  People,
  TickSquare,
} from "iconsax-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import api from "@/api";
import { formatDate } from "@/utils/dateFormatter";
import { toast } from "sonner";
import StatCard from "@/components/StatCard";
import ScanAttendance from "@/components/attendance/ScanAttendance";
import ScanCheckOut from "@/components/attendance/ScanCheckOut";
import useFetch from "@/hooks/useFetch";
import { attendanceStats } from "@/utils/attendanceStats";
import { t } from "i18next";
import { getTextNumberChild } from "@/utils/getTextNumberChild";

export default function AttendanceSupervisor() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState([]);

  const fetchClasses = async () => {
    const response = await api.get("/classes");
    return response.data;
  };
  const { data: classes } = useFetch(fetchClasses);

  const fetchAttendanceData = async (selectedDate, classId) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/attendances?date=${selectedDate}&classId=${classId}`
      );
      setAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      toast.error(
        t(`errorApi.${error?.response?.data?.message || "defaultError"}`)
      );
    } finally {
      setLoading(false);
    }
  };

  // fetch attendance
  useEffect(() => {
    if (date && selectedClass) {
      fetchAttendanceData(date, selectedClass);
    }
  }, [date, selectedClass]);

  const handleAttendanceCreate = async (data) => {
    try {
      if (Array.isArray(data.ids) && data.ids.length > 0) {
        const response = await api.post("/attendances/bulk", data);
        setAttendance((prev) => {
          const newAttendanceMap = new Map();
          response.data.info.forEach((item) => {
            newAttendanceMap.set(item.student._id, {
              attendanceId: item._id,
              status: item.status,
              time: item.createdAt,
              checkInTime: item.checkInTime,
            });
          });

          const updatedInfo = prev.info.map((studentInfo) => {
            const newAttendance = newAttendanceMap.get(studentInfo.student._id);
            return newAttendance
              ? { ...studentInfo, ...newAttendance }
              : studentInfo;
          });

          return { ...prev, recorded: true, info: updatedInfo };
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
          return { ...prev, recorded: true, info: updatedInfo };
        });
      }
      toast.success(t("attendance.successCheckIn"));
    } catch (error) {
      console.error("Error creating attendance:", error);
      toast.error(t("attendance.errorCheckIn"), {
        description: t(
          `errorApi.${error?.response?.data?.message || "defaultError"}`
        ),
      });
    }
  };

  const handleAttendanceCheckOut = async (data) => {
    try {
      if (Array.isArray(data) && data.length > 0) {
        await api.patch("/attendances/check-out/bulk", data);
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
          return { ...prev, info: updatedInfo };
        });
      }
      toast.success(t("attendance.successCheckOut"));
    } catch (error) {
      console.error("Error checking out:", error);
      toast.error(t("attendance.errorCheckOut"), {
        description: t(
          `errorApi.${error?.response?.data?.message || "defaultError"}`
        ),
      });
    }
  };

  const totals = attendanceStats(attendance?.info || []);

  const statsData = [
    {
      title: t("attendance.stats.childrenCount"),
      value: getTextNumberChild(attendance?.info?.length || 0),
      icon: People,
      bgColor: "bg-[#A2F4FD]",
      iconColor: "#00A6F4",
    },
    {
      title: t("attendance.stats.present"),
      value: `${totals?.presentCount || 0} ${t("attendance.present")}`,
      icon: TickSquare,
      bgColor: "bg-[#B9F8CF]",
      iconColor: "#008236",
    },
    {
      title: t("attendance.stats.absent"),
      value: `${totals?.absentCount || 0} ${t("attendance.absent")}`,
      icon: Danger,
      bgColor: "bg-[#FFE2E2]",
      iconColor: "#E7000B",
    },
    {
      title: t("attendance.stats.percentage"),
      value: `${totals?.presentPercentage || 0}%`,
      icon: Chart2,
      bgColor: "bg-[#EDE9FE]",
      iconColor: "#7008E7",
    },
  ];
  return (
    <div className="bg-background p-6">
      <div className="flex flex-col mb-3">
        <Link to="/" className="font-cairo text-muted-foreground">
          <h3 className="text-xl border-border border-b pb-4 mb-4 flex items-center font-bold text-foreground font-cairo">
            <ChevronLeft className="rtl:rotate-180" />
            {t("attendance.title")}
          </h3>
        </Link>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="font-cairo text-muted-foreground">
                  {t("attendance.breadcrumb.dashboard")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-muted-foreground" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-cairo text-primary font-medium">
                {t("attendance.breadcrumb.attendance")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <div className="flex items-center gap-3 w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-32 justify-between font-normal"
                >
                  {date ? formatDate(date) : t("attendance.selectDate")}
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
            <Select onValueChange={(value) => setSelectedClass(value)}>
              <SelectTrigger className="bg-background border-border text-right">
                <SelectValue placeholder={t("attendance.selectClass")} />
              </SelectTrigger>
              <SelectContent>
                {classes?.map((cls) => (
                  <SelectItem key={cls._id} value={cls._id}>
                    {cls.className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex my-3 w-full sm:w-auto">
            <ScanAttendance onAttendanceCreate={handleAttendanceCreate} />
            <ScanCheckOut onAttendanceCheckOut={handleAttendanceCheckOut} />
          </div>
        </div>
        {date && selectedClass ? (
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
              {t("attendance.emptyMessage")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
