import { Skeleton } from "@/components/ui/skeleton"

export default function StudentCardLoading() {
  return (
    <div className="bg-primary text-card-foreground flex flex-col gap-6 rounded-2xl border p-3 sm:p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 items-start">
        {/* Student Photo Loading */}
        <div className="w-[35%] flex flex-col items-center sm:gap-y-2 gap-y-1 justify-center my-auto p-1 md:p-3">
          <div className="rounded-full overflow-hidden border-2 border-border">
            <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
          </div>
          {/* Name Loading */}
          <div className="w-full flex flex-col items-center gap-1">
            <Skeleton className="h-5 sm:h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          {/* School Name Loading */}
          <Skeleton className="h-3 w-2/3" />
        </div>

        {/* Student Information Loading */}
        <div className="flex-1 flex flex-col items-center space-y-2 my-auto bg-card rounded-2xl py-2 sm:py-4">
          <div className="space-y-2 md:space-y-2 w-full flex flex-col items-center">
            {/* Information Rows Loading */}
            {[1, 2, 3].map((index) => (
              <div className="flex sm:text-[13px] text-[10.5px] w-3/4" key={index}>
                <div className="w-1/2">
                  <Skeleton className="h-3 w-4/5" />
                </div>
                <div className="w-1/2">
                  <Skeleton className="h-3 w-3/5" />
                </div>
              </div>
            ))}
          </div>

          {/* QR Code Loading */}
          <div className="w-[50%] sm:w-[45%] flex justify-center my-auto px-2">
            <div className="relative bg-card rounded-xl shadow-lg border-2 border-border">
              <Skeleton className="w-[120px] h-[120px] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}