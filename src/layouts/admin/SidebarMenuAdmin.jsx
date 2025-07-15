import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Briefcase,
  Buliding,
  CardReceive,
  CardSend,
  Category,
  Chart2,
  DollarSquare,
  People,
  Setting2,
} from "iconsax-react";
import { ChevronRight } from "lucide-react";

export default function SidebarMenuAdmin() {
  const location = useLocation();
  const items = [
    {
      title: "لوحة التحكم",
      url: "/",
      icon: Category,
    },
    {
      title: "الفصول",
      url: "/classes",
      icon: Buliding,
    },
    {
      title: "المعلمين",
      url: "/teachers",
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
  ];
  const financialItems = [
    {
      title: "المداخيل",
      url: "/incomes",
      icon: CardReceive,
    },
    {
      title: "المصاريف",
      url: "/expenses",
      icon: CardSend,
    },
  ];
  return (
    <SidebarMenu>
      {items.map((item,i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuButton asChild isActive={location.pathname === item.url}>
            <NavLink to={item.url} key={i}>
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
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger
            className={`text-[14px] ml-auto flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-primary-foreground
             ${
               ["/financial-performance", "/incomes", "/expenses"].includes(
                 location.pathname
               ) && "bg-sidebar-accent text-sidebar-primary-foreground"
             }`}
          >
            <NavLink to={"/financial-performance"}>
              <div className="flex items-center gap-2">
                <DollarSquare
                  variant="Outline"
                  color="CurrentColor"
                  size={20}
                />
                <span>الاداء المالي</span>
              </div>
            </NavLink>
            <ChevronRight
              className={`transition-transform duration-200 
                
                  rtl:rotate-180 rtl:group-data-[state=open]/collapsible:rotate-90
                  ltr:group-data-[state=open]/collapsible:rotate-90
              `}
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className={"px-2 pt-2"}>
              {financialItems.map((item) => (
                <NavLink
                  to={item.url}
                  className={`${
                    location.pathname === item.url &&
                    "border-r-2 border-sidebar-accent"
                  } border-border border-r-1`}
                >
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`${
                        location.pathname === item.url && "text-sidebar-accent"
                      } font-[630] text-[14px]`}
                    >
                      <item.icon
                        variant="Outline"
                        color="CurrentColor"
                        size={20}
                        className="data-[state=open]:mx-2"
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </NavLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
      <SidebarMenuItem key="الاعدادات">
        <SidebarMenuButton asChild isActive={location.pathname === "/settings"}>
          <NavLink to={"/settings"}>
            <Setting2
              variant="Outline"
              color="CurrentColor"
              size={20}
              className="data-[state=open]:mx-2"
            />
            <span className="font-semibold group-data-[collapsible=icon]:hidden">
              الاعدادات
            </span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
