import { Badge } from "@/components/ui/badge";
import { t } from "i18next";

// ✅ Payment status
export const getStatusPayBadge = (status) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 rounded-md px-5 py-2">
          {t("status.paid")}
        </Badge>
      );
    case "unpaid":
      return (
        <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-0 rounded-md px-5 py-2">
          {t("status.unpaid")}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

// ✅ Assessment levels
export const getAssessmentBadge = (status) => {
  switch (status) {
    case "mild":
      return (
        <Badge className="bg-[#DCFCE7] text-[#008236]">
          {t("assessment.mild")}
        </Badge>
      );
    case "moderate":
      return (
        <Badge className="bg-[#FEF3C6] text-[#E17100]">
          {t("assessment.moderate")}
        </Badge>
      );
    case "severe":
      return (
        <Badge className="bg-[#FFE2E2] text-[#C10007]">
          {t("assessment.severe")}
        </Badge>
      );
    default:
      return <Badge className="bg-[#e2e8f0] text-[#44403b]">{status}</Badge>;
  }
};

// ✅ Overall evaluation
export const getOverallBadge = (status) => {
  switch (status) {
    case "weak":
      return (
        <Badge className="bg-[#FFE2E2] text-[#C10007]">
          {t("overall.weak")}
        </Badge>
      );
    case "acceptable":
      return (
        <Badge className="bg-[#FEF3C6] text-[#E17100]">
          {t("overall.acceptable")}
        </Badge>
      );
    case "good":
      return (
        <Badge className="bg-[#DBEAFE] text-[#1447E6]">
          {t("overall.good")}
        </Badge>
      );
    case "very_good":
      return (
        <Badge className="bg-[#DCFCE7] text-[#008236]">
          {t("overall.very_good")}
        </Badge>
      );
    case "excellent":
      return (
        <Badge className="bg-[#ECFCCA] text-[#3D6300]">
          {t("overall.excellent")}
        </Badge>
      );
    default:
      return <Badge className="bg-[#e2e8f0] text-[#44403b]">{status}</Badge>;
  }
};

// ✅ Class status
export const getClassStatusBadge = (studentsCount, capacity) => {
  if (studentsCount >= capacity) {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 rounded-md px-5 py-2">
        {t("status.full")}
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border-0 rounded-md px-5 py-2">
        {t("status.available")}
      </Badge>
    );
  }
};

// ✅ Attendance
export const getAttendancesBadge = (status) => {
  switch (status) {
    case "present":
      return (
        <Badge className="bg-[#dcfce7] text-[#008236] hover:bg-[#dcfce7]">
          {t("status.present")}
        </Badge>
      );
    case "late":
      return (
        <Badge className="bg-[#fef3c6] text-[#e17100] hover:bg-[#fef3c6]">
          {t("status.late")}
        </Badge>
      );
    case "absent":
      return (
        <Badge className="bg-[#ffe2e2] text-[#c10007] hover:bg-[#ffe2e2]">
          {t("status.absent")}
        </Badge>
      );
    default:
      return (
        <Badge className="bg-[#e2e8f0] text-[#44403b] hover:bg-[#e2e8f0]">
          {t("status.not_recorded")}
        </Badge>
      );
  }
};

// ✅ Roles
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

// ✅ Report types
export const getReportTypeBadge = (type) => {
  switch (type) {
    case "financial":
      return (
        <Badge className="bg-[#FCE8FF] text-[#9D0191]">
          {t("report.financial")}
        </Badge>
      );
    case "pedagogical":
      return (
        <Badge className="bg-[#E0F7FA] text-[#006064]">
          {t("report.pedagogical")}
        </Badge>
      );
    case "health":
      return (
        <Badge className="bg-[#FFF3E0] text-[#BF360C]">
          {t("report.health")}
        </Badge>
      );
    default:
      return <Badge className="bg-[#e2e8f0] text-[#44403b]">{type}</Badge>;
  }
};

// ✅ Health conditions
export const getConditionBadge = (conditionValue) => {
  switch (conditionValue) {
    case "fever":
      return (
        <Badge className="bg-[#FFE2E2] text-[#C10007]">
          {t("condition.fever")}
        </Badge>
      );
    case "cough":
      return (
        <Badge className="bg-[#E0F2FE] text-[#0369A1]">
          {t("condition.cough")}
        </Badge>
      );
    case "fatigue":
      return (
        <Badge className="bg-[#EDE9FE] text-[#5B21B6]">
          {t("condition.fatigue")}
        </Badge>
      );
    case "nausea":
      return (
        <Badge className="bg-[#FEF3C7] text-[#B45309]">
          {t("condition.nausea")}
        </Badge>
      );
    case "injury":
      return (
        <Badge className="bg-[#FCE7F3] text-[#BE185D]">
          {t("condition.injury")}
        </Badge>
      );
    default:
      return (
        <Badge className="bg-[#e2e8f0] text-[#44403b]">{conditionValue}</Badge>
      );
  }
};
