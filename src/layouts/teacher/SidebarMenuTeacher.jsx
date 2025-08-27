import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  Category,
  Chart2,
  People,
  Setting2,
  TaskSquare,
} from "iconsax-react";
import { t } from "i18next";

export default function SidebarMenuTeacher() {
  const location = useLocation();
  const items = [
    {
      title: t("sidebar.dashboard"),
      url: "/teacher-dashboard",
      icon: Category,
    },
    {
      title: t("sidebar.students"),
      url: "/teacher-students",
      icon: People,
    },
    {
      title: t("sidebar.attendance"),
      url: "/teacher-attendance",
      icon: TaskSquare,
    },
    {
      title: t("sidebar.reports"),
      url: "/teacher-reports",
      icon: Chart2,
    },
    {
      title: t("sidebar.settings"),
      url: "/settings-user",
      icon: Setting2,
    },
  ];
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={location.pathname === item.url}>
            <NavLink to={item.url}>
              <item.icon
                variant="Outline"
                color="CurrentColor"
                size={20}
                className="data-[state=open]:mx-2"
              />
              <span className="font-semibold group-data-[collapsible=icon]:hidden">
                {item.title}
              </span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
