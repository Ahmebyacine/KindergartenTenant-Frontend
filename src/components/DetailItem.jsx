export default function DetailItem ({ label, value }) { 
  return(
  <div className="flex py-1">
    <span className="text-foreground w-1/2 font-cairo ml-5 line-clamp-1">{label}:</span>
    {typeof value === "string" ? (
      <span className="text-muted-foreground mx-2 font-medium font-cairo line-clamp-1">
        {value}
      </span>
    ) : (
      value
    )}
  </div>
)};