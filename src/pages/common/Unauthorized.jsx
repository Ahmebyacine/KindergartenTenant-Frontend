import React from "react";
import { Shield, AlertTriangle, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Unauthorized({
  showHomeButton = true,
  showBackButton = true
}) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{t("unauthorized.title")}</CardTitle>
          <CardDescription>{t("unauthorized.description")}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm flex items-center gap-3 text-destructive w-full">
            <AlertTriangle className="h-4 w-4" />
            <div>{t("unauthorized.errorBox")}</div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {showBackButton && (
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              {t("unauthorized.backButton")}
            </Button>
          )}
          {showHomeButton && (
            <Button asChild className="w-full sm:w-auto">
              <Link to="/login" className="flex items-center">
                <LogIn className="ml-2 h-4 w-4" />
                {t("unauthorized.loginButton")}
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
