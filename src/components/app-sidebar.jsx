import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import SidebarMenuAdmin from "@/layouts/admin/SidebarMenuAdmin";
import LogoutButton from "./LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { More, ProfileCircle, Setting2 } from "iconsax-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import SidebarMenuSupervisor from "@/layouts/supervisor/SidebarMenuSupervisor";
import SidebarMenuTeacher from "@/layouts/teacher/SidebarMenuTeacher";
import img from "@/assets/images/avatar.png";
import logoAr from "@/assets/images/logoSidebarArabic.png";
import logoLt from "@/assets/images/logoSidebarLatino.png";
import { t } from "i18next";

export function AppSidebar() {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  return (
    <Sidebar
      side={i18n.language === "ar" ? "right" : "left"}
      collapsible="icon"
    >
      <SidebarHeader className="h-16 px-3 py-3 font-bold transition-all duration-300">
        <img
          src={
            i18n.language === "ar"
              ? logoAr
              : logoLt
          }
          alt="Rawdatee Logo"
          className="h-full object-contain group-data-[collapsible=icon]:hidden"
        />
        <img
          src="images/rawdatee.png"
          alt="Rawdatee Logo"
          className="h-full object-contain group-data-[collapsible=icon]:block hidden"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {user && user.role === "admin" && <SidebarMenuAdmin />}
            {user && user.role === "supervisor" && <SidebarMenuSupervisor />}
            {user && user.role === "teacher" && <SidebarMenuTeacher />}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className={"border-border border-2 rounded-lg"}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" asChild>
                  <div>
                    <div className="flex aspect-square size-8 items-center justify-center bg-transbarnt text-sidebar-accent-foreground">
                      <img
                        src={
                          user?.image
                            ? import.meta.env.VITE_API_URL_PICTURE + user?.image + ".png"
                            : img
                        }
                        alt="User"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <More
                      size={16}
                      color="var(--muted-foreground)"
                      className="rotate-90"
                    />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-popper-anchor-width)] rounded-lg"
              >
                <DropdownMenuItem className="p-0">
                  <LogoutButton />
                </DropdownMenuItem>
                <Link
                  to={
                    user && user.role === "admin"
                      ? "/settings?tab=security"
                      : "/settings-user?tab=security"
                  }
                >
                  <DropdownMenuItem className="p-0">
                    <Button
                      className="w-full justify-start text-foreground border-b"
                      variant="ghost"
                    >
                      <Setting2
                        size={16}
                        variant="Outline"
                        color="var(--foreground)"
                        className="size-5"
                      />
                      <span>{t("sidebar.securitySettings")}</span>
                    </Button>
                  </DropdownMenuItem>
                </Link>
                <Link
                  to={
                    user && user.role === "admin"
                      ? "/settings?tab=personalSettings"
                      : "/settings-user?tab=personalSettings"
                  }
                >
                  <DropdownMenuItem className="p-0">
                    <Button
                      className="w-full justify-start text-foreground border-b"
                      variant="ghost"
                    >
                      <ProfileCircle
                        size={16}
                        variant="Outline"
                        color="var(--foreground)"
                        className="size-5"
                      />
                      <span>{t("sidebar.profile")}</span>
                    </Button>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
