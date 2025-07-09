import { Badge } from "@/components/ui/badge";

export const getStatusPayBadge = (status) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 rounded-md px-5 py-2">
          مدفوع
        </Badge>
      );
    case "unpaid":
      return (
        <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-0 rounded-md px-5 py-2">
          غير مدفوع
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const getAssessmentBadge = (status) => {
  switch (status) {
    case "ممتاز":
      return (
        <Badge className="bg-[#ecfcca] text-[#3d6300] hover:bg-[#ecfcca]">
          {status}
        </Badge>
      );
    case "جيد جداً":
      return (
        <Badge className="bg-[#dcfce7] text-[#008236] hover:bg-[#dcfce7]">
          {status}
        </Badge>
      );
    case "جيد":
      return (
        <Badge className="bg-[#dbeafe] text-[#1447e6] hover:bg-[#dbeafe]">
          {status}
        </Badge>
      );
    case "يحتاج متابعة":
      return (
        <Badge className="bg-[#fef3c6] text-[#e17100] hover:bg-[#fef3c6]">
          {status}
        </Badge>
      );
    case "يحتاج تدخل":
      return (
        <Badge className="bg-[#ffe2e2] text-[#c10007] hover:bg-[#ffe2e2]">
          {status}
        </Badge>
      );
    default:
      return (
        <Badge className="bg-[#e2e8f0] text-[#44403b] hover:bg-[#e2e8f0]">
          {status}
        </Badge>
      );
  }
};

export const getClassStatusBadge = (studentsCount, capacity) => {
  if (studentsCount >= capacity) {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 rounded-md px-5 py-2">
        مكتمل
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-0 rounded-md px-5 py-2">
        متاح
      </Badge>
    );
  }
};

export const getAttendancesBadge = (status) => {
  switch (status) {
    case "present":
      return (
        <Badge className="bg-[#dcfce7] text-[#008236] hover:bg-[#dcfce7]">
          حاضر
        </Badge>
      );
    case "late":
      return (
        <Badge className="bg-[#fef3c6] text-[#e17100] hover:bg-[#fef3c6]">
          متأخر
        </Badge>
      );
    case "absent":
      return (
        <Badge className="bg-[#ffe2e2] text-[#c10007] hover:bg-[#ffe2e2]">
          غائب
        </Badge>
      );
    default:
      return (
        <Badge className="bg-[#e2e8f0] text-[#44403b] hover:bg-[#e2e8f0]">
          غير مسجل
        </Badge>
      );
  }
};

export const getRoleTagColors = (role) => {
  switch (role) {
    case "teacher":
      return "bg-primary/10 text-primary";
    case "supervisor":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    case "admin":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    default:
      return "bg-muted text-muted-foreground";
  }
};