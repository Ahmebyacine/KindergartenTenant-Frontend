import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

export default function DeleteAlertDialog({
  trigger = "حذف",
  onDelete,
  title = "حذف العنصر",
  description = "هل أنت متأكد من حذف العنصر المحدد؟ لا يمكن التراجع عن هذا الإجراء.",
  item,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="text-destructive hover:text-primary/80 p-1 h-auto underline text-xs sm:text-sm justify-start sm:justify-center"
        >
          {trigger}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="!text-center space-y-6">
          <div className="mx-auto w-17 h-17 bg-red-100/80 rounded-full flex items-center justify-center">
            <Trash size={45} color="#fb2c36" />
          </div>

          <AlertDialogTitle className="text-xl font-semibold mb-0">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete?.(item)}>
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
