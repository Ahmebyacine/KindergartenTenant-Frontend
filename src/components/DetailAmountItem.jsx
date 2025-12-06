import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { Check, Edit } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

export default function DetailAmountItem({
  label,
  value,
  onChange,
  editable = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { format } = useCurrency();
  return (
    <div className="flex py-1">
      <span className="text-foreground w-1/2 font-cairo ml-5 line-clamp-1">
        {label}:
      </span>
      <span className="text-muted-foreground mx-2 font-medium font-cairo line-clamp-1">
        {editable ? (
          <>
            {isEditing ? (
              <div className="flex items-center">
                <Input
                  type="number"
                  defaultValue={value}
                  onChange={(e) => onChange(e.target.value)}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Check className="mx-2" />
                </Button>
              </div>
            ) : (
              <>
                {format(value)}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="mx-2" />
                </Button>
              </>
            )}
          </>
        ) : (
          format(value)
        )}
      </span>
    </div>
  );
}
