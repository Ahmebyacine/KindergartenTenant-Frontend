import {
  CalendarSearch,
  Chart2,
  Danger,
  People,
  SearchNormal1,
  TickSquare,
} from "iconsax-react";
import { Input } from "@/components/ui/input";
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
import i18n from "@/i18n";
import { toast } from "sonner";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/contexts/AuthContext";

const statsData = [
  {
    title: "عدد الأطفال",
    value: "25 طفل",
    icon: People,
    bgColor: "bg-[#A2F4FD]",
    iconColor: "#00A6F4",
  },
  {
    title: "الحضور",
    value: "22 حاضر",
    icon: TickSquare,
    bgColor: "bg-[#B9F8CF]",
    iconColor: "#008236",
  },
  {
    title: "الغياب",
    value: "3 غائب",
    icon: Danger,
    bgColor: "bg-[#FFE2E2]",
    iconColor: "#E7000B",
  },
  {
    title: "نسبة الحضور",
    value: "88%",
    icon: Chart2,
    bgColor: "bg-[#EDE9FE]",
    iconColor: "#7008E7",
  },
];

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
      console.log(response.data);
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
    console.log(data);
    try {
      if (Array.isArray(data.ids) && data.ids.length > 0) {
        const response = await api.post("/attendances/bulk", data);
        console.log(response.data);
      } else {
        const response = await api.post("/attendances", {
          ...data,
          enrollmentId: data.ids,
        });
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
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
        console.log(response.data);
      }
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-background p-6">
      <div className="mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-col gap-3">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal"
                  >
                    {date ? formatDate(date, i18n.language) : "Select date"}
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
          </div>
          <div className="relative w-full sm:w-64">
            <SearchNormal1
              size="16"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              color="currentColor"
            />
            <Input
              placeholder="البحث"
              className="pr-10 pl-4 py-2 bg-background"
              disabled={!date || attendance.length === 0}
            />
          </div>
        </div>
        {date ? (
          <>
            {attendance.recorded && (
              <div className="w-full my-4 py-3">
                {/* Carousel for screens smaller than lg */}
                <div className="block lg:hidden px-4">
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {statsData.map((stat, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2"
                        >
                          <StatCard stat={stat} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>

                {/* Grid for lg screens and above */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-6 px-4">
                  {statsData.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                  ))}
                </div>
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
