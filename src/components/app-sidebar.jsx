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
import { Command, More, ProfileCircle, Setting2 } from "iconsax-react";
import img from "@/assets/images/avatar.png";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import SidebarMenuSupervisor from "@/layouts/supervisor/SidebarMenuSupervisor";
import SidebarMenuTeacher from "@/layouts/teacher/SidebarMenuTeacher";

export function AppSidebar() {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  return (
    <Sidebar
      side={i18n.language === "ar" ? "right" : "left"}
      collapsible="icon"
    >
      <SidebarHeader className="h-16 px-3 py-auto font-bold transition-all duration-300">
        LOGO
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
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transbarnt text-sidebar-accent-foreground">
                      <img
                        src={img}
                        alt="User"
                        className="h-full w-full object-cover"
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
                dir="rtl"
              >
                <DropdownMenuItem className="p-0">
                  <LogoutButton />
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Button
                    className="w-full justify-start text-foreground hover:text-red-400 border-b"
                    variant="ghost"
                  >
                    <Setting2
                      size={16}
                      variant="Outline"
                      color="var(--foreground)"
                      className="size-5"
                    />
                    <span>اعدادات الامان</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Button
                    className="w-full justify-start text-foreground hover:text-red-400 border-b"
                    variant="ghost"
                  >
                    <ProfileCircle
                      size={16}
                      variant="Outline"
                      color="var(--foreground)"
                      className="size-5"
                    />
                    <span>الملف الشخصي</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
