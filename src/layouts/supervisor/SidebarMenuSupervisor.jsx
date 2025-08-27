import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  Briefcase,
  Buliding,
  Category,
  Chart2,
  People,
  Setting2,
} from "iconsax-react";
import { t } from "i18next";

export default function SidebarMenuSupervisor() {
  const location = useLocation();
  const items = [
    {
      title: t("sidebar.dashboard"),
      url: "/supervisor-dashboard",
      icon: Category,
    },
    {
      title: t("sidebar.classes"),
      url: "/supervisor-classes",
      icon: Buliding,
    },
    {
      title: t("sidebar.teachers"),
      url: "/supervisor-teachers",
      icon: Briefcase,
    },
    {
      title: t("sidebar.students"),
      url: "/students",
      icon: People,
    },
    {
      title: t("sidebar.reports"),
      url: "/reports",
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
            <NavLink to={item.url} key={item.url || item.title}>
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
