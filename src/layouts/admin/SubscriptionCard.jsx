import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { daysUntil } from "@/utils/dateFormatter";
import { Medal } from "iconsax-react";

export default function SubscriptionCard() {
  const { config } = useAuth();
  const { t } = useTranslation();

  const days = daysUntil(config.endSubscription);

  return (
    <Card
      className={`group-data-[collapsible=icon]:hidden p-0 py-3 gap-2 ${
        config.status === "trial" ? "bg-secondary/15" : "bg-primary/15"
      }`}
    >
      <CardHeader className="flex text-sm font-medium">
        <Medal size={20} color="var(--primary)" />
        {t("dashboard.subscription.current")}:{" "}
        {config.status === "trial"
          ? t("dashboard.subscription.trial")
          : t("dashboard.subscription.paid")}
        {config.status === "trial" && ` • ${t("dashboard.subscription.upgrade")}`}
      </CardHeader>

      <CardContent>
        <p className="text-xs text-muted-foreground mb-2">
          {t("dashboard.subscription.expiresIn", { days })}
        </p>

        {(config.status === "trial" || days <= 7) && (
          <Button className="w-full" asChild>
            <a
              href={`http://www.rawdatee.com/${i18n.language}/contact`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("dashboard.subscription.upgradeNow")}
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
