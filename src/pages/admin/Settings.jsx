import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "@/layouts/admin/settings/GeneralSettings";
import UsersSettings from "@/layouts/admin/settings/UsersSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

export default function Settings() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "generalSettings";

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs defaultValue={defaultTab} className="w-full">
            {/* Keep existing TabsList and TabsTrigger styles */}
            <TabsList className="w-full grid grid-cols-3 lg:grid-cols-8 md:grid-cols-6  bg-transparent h-auto p-0 gap-8 border-b mb-2">
              <TabsTrigger
                value="generalSettings"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                الإعدادات العامة
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="rounded-t-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                المستخدمون
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                التقارير
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                الإشعارات
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                الدفع
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                الأمان
              </TabsTrigger>
            </TabsList>
            {/* Move TabsContent inside first Tabs component */}
            <TabsContent value="generalSettings" className="space-y-4">
              <GeneralSettings />
            </TabsContent>
            <TabsContent value="users" className="space-y-4">
              <UsersSettings />
            </TabsContent>
            <TabsContent value="reports" className="space-y-4"></TabsContent>
            <TabsContent value="notifications" className="space-y-4"></TabsContent>
            <TabsContent value="payments" className="space-y-4"></TabsContent>
            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
