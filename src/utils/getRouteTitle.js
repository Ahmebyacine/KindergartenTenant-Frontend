export const getRouteTitle = (pathname) => {
  const routes = {
    "/": "لوحة التحكم",
    "/reports": "التقارير",
    "/classes": "الفصول",
  };

  return routes[pathname] || "Rawdati Platform";
};