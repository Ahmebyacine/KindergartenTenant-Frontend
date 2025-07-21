import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "i18next";
import { Danger } from "iconsax-react";

export default function StatCard({ stat, loading = false, error = null }) {
  return (
    <Card className="py-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
      <CardContent className="p-6">
        {error ? (
          <div className="text-center text-destructive text-sm min-w-[140px]">
            <Danger size="32" color="currentColor" className="mx-auto" />
            <p className="mb-2">{error?.status}</p>
            <p className="mb-2">{t(`errorApi.${error?.message}`)}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1 min-w-[140px]">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="w-10 h-10 rounded-xl" />
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div
                    className={`min-w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon size={24} color={stat.iconColor} />
                  </div>
                </>
              )}
            </div>

            <div className="text-right mt-1">
              {loading ? (
                <>
                  <Skeleton className="h-6 w-20 mb-2 ml-auto" />
                  <Skeleton className="h-3 w-32 ml-auto" />
                </>
              ) : (
                <>
                  <p className="text-[22px] font-bold text-foreground">
                    {stat.value}
                  </p>
                  {stat.subLabel && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {stat.subLabel}
                    </p>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
