import { ChevronLeft, ChevronRight } from "lucide-react";
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
  SearchNormal1,
  TickSquare,
} from "iconsax-react";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import img from "@/assets/images/attendanceillu.png";
import AttendanceTable from "@/layouts/admin/attendance/AttendanceTable";
import api from "@/api";
import { formatDate } from "@/utils/dateFormatter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import StatCard from "@/components/StatCard";
import useFetch from "@/hooks/useFetch";
import { attendanceStats } from "@/utils/attendanceStats";
import {getTextNumberChild } from "@/utils/getTextNumberChild";
import { t } from "i18next";

export default function Attendance() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendance, setAttendance] = useState([]);

  const fetchClasses = async () => {
    const response = await api.get("/classes");
    return response.data;
  };
  const { data: classes } = useFetch(fetchClasses);

  const fetchAttendanceData = async (selectedDate, classId) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/attendances?date=${selectedDate}&classId=${classId}`
      );
      setAttendance(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  // fetch attendce
  useEffect(() => {
    if (date && selectedClass) {
      fetchAttendanceData(date, selectedClass);
    }
  }, [date, selectedClass]);

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-col gap-3">
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
                  />
                </PopoverContent>
              </Popover>
            </div>
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
        </div>
        {date && selectedClass ? (
          <>
            {attendance.recorded && (
              <div className="w-full my-4 p-3">
                <Carousel
                  opts={{
                    align: "end",
                    loop: false,
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
            <AttendanceTable attendance={attendance.info} loading={loading} />
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
