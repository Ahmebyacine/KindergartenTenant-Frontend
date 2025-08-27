import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Danger, Edit2, More, Trash } from "iconsax-react";
import img from "@/assets/images/avatar.png";
import { getRoleTagColors } from "@/utils/getStatusBadges";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "i18next";

export default function UserCard({
  user,
  loading,
  error,
  onEdit,
  onDelete,
  onChangePassword,
}) {
  const [open, setOpen] = useState(false);
  if (error) {
    return (
      <Card className="text-right">
        <CardContent className="px-4 pb-4 flex items-start text-destructive space-x-3 overflow-x-hidden">
          <div className="w-[50px] h-[50px] rounded-full shrink-0">
            <Danger size={32} color="currentColor" />
          </div>
          <div className="flex flex-col mr-3 gap-2 w-full">
            <span>{error.status}</span>
            {t(`errorApi.${error.message}`)}
          </div>
        </CardContent>
      </Card>
    );
  }
  if (loading) {
    return (
      <Card className="text-right">
        <CardContent className="px-4 pb-4 flex items-start space-x-3 overflow-x-hidden">
          <div className="w-[50px] h-[50px] rounded-full shrink-0">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
          <div className="flex flex-col mr-3 gap-2 w-full">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-[60px] rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <>
      <Card>
        <CardContent className="px-4 pb-0 flex flex-row justify-between items-start">
          {/* User Info */}
          <div
            className="flex items-start overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="rounded-full bg-primary/10 w-[50px] h-[50px] shrink-0">
              <img
                src={
                  user?.image
                    ? import.meta.env.VITE_API_URL_PICTURE + user?.image + ".png"
                    : img
                }
                alt="User"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col mr-3">
              <span className="text-sm font-medium text-foreground">
                {user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
              <span
                className={`px-3 py-1 max-w-[60px] rounded-full text-xs font-medium ${getRoleTagColors(
                  user.role
                )}`}
              >
                {user.role}
              </span>
            </div>
          </div>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:bg-muted"
              >
                <More size={16} color="currentColor" className="rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl bg-popover border-border"
            >
              <DropdownMenuItem>
                <Button
                  className="w-full justify-start text-foreground hover:text-destructive border-b border-border"
                  variant="ghost"
                  onClick={() => onChangePassword?.(user)}
                >
                  <Edit2 size={10} color="var(--foreground)" />
                  <span className="ml-2">{t("settings.users.changePassword")}</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="w-full justify-start text-foreground hover:text-destructive border-b border-border"
                  variant="ghost"
                  onClick={() => onEdit?.(user)}
                >
                  <span className="ml-2">{t("settings.users.editAccount")}</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="w-full justify-start text-destructive hover:text-destructive/80 border-b border-border"
                  variant="ghost"
                  onClick={() => setOpen(true)}
                >
                  <Trash size={10} color="var(--destructive)" />
                  <span className="ml-2">{t("settings.users.deleteAccount")}</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="!text-center space-y-6">
            {/* Icon Container */}
            <div className="mx-auto w-17 h-17 bg-red-100/80 rounded-full flex items-center justify-center">
              <Trash size={45} color="#fb2c36" />
            </div>

            <AlertDialogTitle className="text-xl font-semibold mb-0">
              {t("settings.users.deleteAccount")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground leading-relaxed">
              {t("settings.users.deleteAccountConfirmation")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete?.(user)}>
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
