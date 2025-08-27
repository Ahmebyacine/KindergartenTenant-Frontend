import { months } from "@/assets/data/data";

export function getMonthNameByNumber(monthNumber) {
  const padded = monthNumber.toString().padStart(2, "0");
  const found = months.find((m) => m.value === padded);
  return found ? found.key : null;
}