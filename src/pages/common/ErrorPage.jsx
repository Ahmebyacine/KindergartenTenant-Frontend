import { Card, CardContent } from "@/components/ui/card"
import { t } from "i18next"

export default function ErrorPage({ error }) {
  return (
    <div className="flex h-[80vh] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
          {/* Status Number */}
          <div className="text-8xl font-bold text-foreground">{error?.status || 404}</div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground">{t("errorPage.title")}</h1>

          {/* Message */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(`errorApi.${error?.message || "unknownError"}`)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}