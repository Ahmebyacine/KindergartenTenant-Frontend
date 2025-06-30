import React from "react";
import { Card, CardContent } from "./ui/card";

export default function StatCard({ stat }) {
  return (
    <Card className="bg-card border-border py-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-muted-foreground">{stat.title}</p>
          <div
            className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}
          >
            <stat.icon size={24} color={stat.iconColor} />
          </div>
        </div>
        <div className="text-right mt-1">
          <p className="text-[22px] font-bold text-foreground">{stat.value}</p>
          {stat.subLabel && (
            <p className="text-xs text-muted-foreground mb-1">
              {stat.subLabel}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
