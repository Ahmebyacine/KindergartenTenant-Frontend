import { t } from "i18next";

export const getRouteTitle = (pathname) => {
  const routes = {
    "/": t("routes.home"),
    // Admin
    "/dashboard": t("routes.adminDashboard"),
    "/students": t("routes.students"),
    "/teachers": t("routes.teachers"),
    "/settings": t("routes.settings"),
    "/incomes": t("routes.incomes"),
    "/expenses": t("routes.expenses"),
    "/financial-performance": t("routes.financialPerformance"),
    "/attendance": t("routes.attendance"),

    // Supervisor
    "/supervisor-dashboard": t("routes.supervisorDashboard"),
    "/supervisor-classes": t("routes.supervisorClasses"),
    "/supervisor-attendance": t("routes.supervisorAttendance"),
    "/supervisor-teachers": t("routes.supervisorTeachers"),

    // Teacher
    "/teacher-dashboard": t("routes.teacherDashboard"),
    "/teacher-students": t("routes.teacherStudents"),
    "/teacher-reports": t("routes.teacherReports"),
    "/teacher-attendance": t("routes.teacherAttendance"),

    // General
    "/reports": t("routes.reports"),
    "/classes": t("routes.classes"),
    "/settings-user": t("routes.settingsUser"),
    "/unauthorized": t("routes.unauthorized"),
    "/loading": t("routes.loading"),
    "/no-tenant-error": t("routes.noTenantError"),
  };

  return routes[pathname] || "Rawdati Platform";
};
