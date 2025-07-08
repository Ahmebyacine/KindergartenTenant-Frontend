import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner"


export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="w-full">
        <SidebarInset>
          <Header />
        </SidebarInset>
        <Outlet />
        <Toaster position="bottom-center" richColors />
      </main>
    </SidebarProvider>
  );
}
