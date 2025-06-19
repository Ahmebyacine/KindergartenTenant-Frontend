import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { CalendarSearch, Chart2, Danger, People, SearchNormal1, TickSquare } from "iconsax-react";
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
import api from "@/services/api";
import { formatDate } from "@/utils/dateFormatter";
import i18n from "@/i18n";
import { Card, CardContent } from "@/components/ui/card";

export default function Attendance() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);

  //fetch CLasses
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/classes");
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClasses();
  }, []);

  const fetchAttendanceData = async (selectedDate, classId) => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const response = await api.get(
        `/attendance?date=${formattedDate}&classId=${classId}`
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

  return (
    <div className="bg-background p-6">
      <div className="flex flex-col mb-3">
        <Link to="/" className="font-cairo text-muted-foreground">
          <h3 className="text-xl border-border border-b pb-4 mb-4 flex items-center font-bold text-foreground font-cairo">
            <ChevronRight />
            سجل الحضور
          </h3>
        </Link>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="font-cairo text-muted-foreground">
                  لوحة التحكم
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-muted-foreground" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-cairo text-primary font-medium">
                الحضور
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Select onValueChange={(value) => setSelectedClass(value)}>
              <SelectTrigger className="bg-background border-border text-right">
                <SelectValue placeholder="اختيار الفصل" />
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
          <div className="relative w-full sm:w-64">
            <SearchNormal1
              size="16"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              color="currentColor"
            />
            <Input
              placeholder="البحث"
              className="pr-10 pl-4 py-2 bg-background"
              disabled={!date || !selectedClass || attendance.length === 0}
            />
          </div>
        </div>
        {date && selectedClass ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex items-center w-full">
                      <div className="flex items-center justify-between w-full gap-2">
                        <p className="text-sm text-muted-foreground mb-1">
                          عدد الأطفال
                        </p>
                        <div className="w-10 h-10 bg-[#A2F4FD] rounded-xl flex items-center justify-center">
                          <People size={24} color="#00A6F4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right mt-1">
                    <p className="text-[22px] font-bold text-foreground">
                      25 طفل
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-muted-foreground">
                      الحضور
                    </p>
                    <div className="w-10 h-10 bg-[#B9F8CF] rounded-xl flex items-center justify-center">
                      <TickSquare size={24} color="#008236" />
                    </div>
                  </div>

                  <div className="text-right mt-1">
                    <p className="text-[22px] font-bold text-foreground">
                      22 حاضر
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-muted-foreground">
                      الغياب
                    </p>
                    <div className="w-10 h-10 bg-[#FFE2E2] rounded-xl flex items-center justify-center">
                      <Danger size={24} color="#E7000B" />
                    </div>
                  </div>

                  <div className="text-right mt-1">
                    <p className="text-[22px] font-bold text-foreground">
                      3 غائب
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-muted-foreground">
                      نسبة الحضور
                    </p>
                    <div className="w-10 h-10 bg-[#EDE9FE] rounded-xl flex items-center justify-center">
                      <Chart2 size={24} color="#7008E7" />
                    </div>
                  </div>

                  <div className="text-right mt-1">
                    <p className="text-[22px] font-bold text-foreground">
                      88%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <AttendanceTable attendance={attendance} loading={loading} />
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
