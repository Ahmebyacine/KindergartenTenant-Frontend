import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsFinancialTable from "@/components/reports/ReportsFinancialTable";
import ReportsHealthTable from "@/components/reports/ReportsHealthTable";
import ReportsPedagogicalTable from "@/components/reports/ReportsPedagogicalTable";
import useFetch from "@/hooks/useFetch";
import ErrorPage from "../common/ErrorPage";
import { fetchClasses } from "@/api/classesApi";
import { fetchStudents } from "@/api/studentsApi";
import { t } from "i18next";
import { useAuth } from "@/contexts/AuthContext";

export default function Reports() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "pedagogical";
  const { user } = useAuth();

  const { data: classes, error: classesError } = useFetch(fetchClasses);

  const { data: students, error: studentsError } = useFetch(fetchStudents);

  if (classesError || studentsError)
    return <ErrorPage error={classesError || studentsError} />;

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 gap-8 md:grid-cols-4 lg:grid-cols-6 border-b mb-2">
              {user?.permissions?.reportPedagogique !== false && (
                <TabsTrigger
                  value="pedagogical"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("reports.tabs.pedagogical")}
                </TabsTrigger>
              )}
              {user?.permissions?.reportFinancial !== false && (
                <TabsTrigger
                  value="financial"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("reports.tabs.financial")}
                </TabsTrigger>
              )}
              {user?.permissions?.reportHealth !== false && (
                <TabsTrigger
                  value="health"
                  className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
                >
                  {t("reports.tabs.health")}
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="pedagogical" className="space-y-4">
              <ReportsPedagogicalTable classes={classes} students={students} />
            </TabsContent>
            <TabsContent value="financial" className="space-y-4">
              <ReportsFinancialTable classes={classes} students={students} />
            </TabsContent>
            <TabsContent value="health" className="space-y-4">
              <ReportsHealthTable classes={classes} students={students} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
