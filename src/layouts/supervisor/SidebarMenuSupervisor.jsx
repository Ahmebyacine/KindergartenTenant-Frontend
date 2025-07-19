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

export default function SidebarMenuSupervisor() {
  const location = useLocation();
  const items = [
    {
      title: "لوحة التحكم",
      url: "/supervisor-dashboard",
      icon: Category,
    },
    {
      title: "الفصول",
      url: "/supervisor-classes",
      icon: Buliding,
    },
    {
      title: "المعلمين",
      url: "/supervisor-teachers",
      icon: Briefcase,
    },
    {
      title: "الأطفال",
      url: "/students",
      icon: People,
    },
    {
      title: "التقارير",
      url: "/reports",
      icon: Chart2,
    },
    {
      title: "الاعدادات",
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
