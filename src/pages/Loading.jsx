import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="hidden md:block w-64 bg-card border-r border-border p-6">
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-muted rounded-lg">
              <Skeleton className="w-full h-4 bg-muted-foreground/30 rounded" />
            </div>
          ))}
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="h-10 bg-muted rounded-lg">
                <Skeleton className="w-full h-4 bg-muted-foreground/30 rounded" />
              </div>
            </div>
            <div className="ml-4">
              <div className="h-10 w-20 bg-muted rounded-lg">
                <Skeleton className="w-full h-4 bg-muted-foreground/30 rounded" />
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="h-full bg-muted rounded-2xl">
            <Skeleton className="w-full h-4 bg-muted-foreground/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
