import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "@/layouts/admin/settings/GeneralSettings";
import UsersSettings from "@/layouts/admin/settings/UsersSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import PersonalSettings from "@/components/settings/PersonalSettings";
import { t } from "i18next";

export default function Settings() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "generalSettings";

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4  bg-transparent h-auto p-0 gap-8 border-b mb-2">
              <TabsTrigger
                value="generalSettings"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                {t("settings.tabs.general")}
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                {t("settings.tabs.users")}
              </TabsTrigger>
              <TabsTrigger
                value="personalSettings"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                {t("settings.tabs.personal")}
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                {t("settings.tabs.security")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generalSettings" className="space-y-4">
              <GeneralSettings />
            </TabsContent>
            <TabsContent value="users" className="space-y-4">
              <UsersSettings />
            </TabsContent>
            <TabsContent value="personalSettings" className="space-y-4">
              <PersonalSettings />
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
