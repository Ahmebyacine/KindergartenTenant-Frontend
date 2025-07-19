export const getRouteTitle = (pathname) => {
  const routes = {
    "/": "لوحة التحكم",
    // Admin
    "/dashboard": "لوحة تحكم المدير",
    "/students": "الطلاب",
    "/teachers": "المعلمون",
    "/settings": "الإعدادات",
    "/incomes": "الإيرادات",
    "/expenses": "المصروفات",
    "/financial-performance": "الأداء المالي",
    "/attendance": "الحضور",

    // Supervisor
    "/supervisor-dashboard": "لوحة تحكم المشرف",
    "/supervisor-classes": "الفصول",
    "/supervisor-attendance": "حضور المشرف",
    "/supervisor-teachers": "المعلمون",

    // Teacher
    "/teacher-dashboard": "لوحة تحكم المعلم",
    "/teacher-students": "طلاب المعلم",
    "/teacher-reports": "تقارير المعلم",
    "/teacher-attendance": "حضور المعلم",

    // General
    "/reports": "التقارير",
    "/classes": "الفصول",
    "/settings-user": "الإعدادات",
    "/unauthorized": "وصول غير مصرح به",
    "/loading": "جاري التحميل",
    "/no-tenant-error": "خطأ في المستأجر",
  };

  return routes[pathname] || "Rawdati Platform";
};