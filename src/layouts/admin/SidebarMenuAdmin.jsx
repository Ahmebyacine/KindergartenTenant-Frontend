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
  Building,
  CardReceive,
  CardSend,
  Category,
  Chart2,
  DollarSquare,
  People,
  Setting2,
} from "iconsax-react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SidebarMenuAdmin() {
  const location = useLocation();
  const { t } = useTranslation();

  const items = [
    {
      title: t("sidebar.dashboard"),
      url: "/",
      icon: Category,
    },
    {
      title: t("sidebar.classes"),
      url: "/classes",
      icon: Building,
    },
    {
      title: t("sidebar.teachers"),
      url: "/teachers",
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
  ];

  const financialItems = [
    {
      title: t("sidebar.incomes"),
      url: "/incomes",
      icon: CardReceive,
    },
    {
      title: t("sidebar.expenses"),
      url: "/expenses",
      icon: CardSend,
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item, i) => (
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
                <span className="group-data-[collapsible=icon]:hidden">
                  {t("sidebar.financialPerformance")}
                </span>
              </div>
            </NavLink>
            <ChevronRight
              className={`transition-transform duration-200 
                  group-data-[collapsible=icon]:hidden
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
                  key={item.url || item.title}
                  to={item.url}
                  className={`${
                    location.pathname === item.url &&
                    "rtl:border-r-2 ltr:border-l-2 border-sidebar-accent"
                  } border-border rtl:border-r-1 ltr:border-l-1`}
                >
                  <SidebarMenuItem>
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
      <SidebarMenuItem key="settings">
        <SidebarMenuButton asChild isActive={location.pathname === "/settings"}>
          <NavLink to={"/settings"}>
            <Setting2
              variant="Outline"
              color="CurrentColor"
              size={20}
              className="data-[state=open]:mx-2"
            />
            <span className="font-semibold group-data-[collapsible=icon]:hidden">
              {t("sidebar.settings")}
            </span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
