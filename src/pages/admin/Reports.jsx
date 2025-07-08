import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsFinancialTable from "@/layouts/admin/reports/ReportsFinancialTable";
import ReportsHealthTable from "@/layouts/admin/reports/ReportsHealthTable";
import ReportsPedagogicalTable from "@/layouts/admin/reports/ReportsPedagogicalTable";
import api from "@/services/api";
import useFetch from "@/hooks/useFetch";

export default function Reports() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "pedagogical";

  const fetchClasses = async () => {
    const response = await api.get("/classes");
    return response.data;
  };

  const fetchStudents = async () => {
    const response = await api.get("/enrollments");
    return response.data.data;
  };
  const { data: classes } = useFetch(fetchClasses);

  const { data: students } = useFetch(fetchStudents);

  return (
    <div className="bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-start">
          <Tabs defaultValue={defaultTab} className="w-full">
            {/* Keep existing TabsList and TabsTrigger styles */}
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0 gap-8 md:grid-cols-4 lg:grid-cols-6 border-b mb-2">
              <TabsTrigger
                value="pedagogical"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                تقارير بداغوجية
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="rounded-t-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                تقارير مالية
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-2"
              >
                تقارير صحية
              </TabsTrigger>
            </TabsList>
            {/* Move TabsContent inside first Tabs component */}
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
