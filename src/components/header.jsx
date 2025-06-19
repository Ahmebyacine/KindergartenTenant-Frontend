import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
import { getRouteTitle } from "@/utils/getRouteTitle";

export default function Header() {
  const { pathname } = useLocation();
  const pageTitle = getRouteTitle(pathname);
  return (
    <header className="flex h-16 shrink-0 items-center sticky top-0 z-50 border-b gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center px-4">
        <SidebarTrigger className="-ml-1 border-l-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="p-1 text-xl font-bold">{pageTitle}</div>
      </div>
    </header>
  );
}
