// Helper to generate page numbers with ellipsis
function getPageNumbers(current, total) {
  const delta = 2;
  const range = [];
  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }
  if (current - delta > 2) {
    range.unshift("ellipsis");
  }
  if (current + delta < total - 1) {
    range.push("ellipsis");
  }
  range.unshift(1);
  if (total > 1) range.push(total);
  // Remove duplicates and sort
  return [...new Set(range)].filter(
    (n) => n === "ellipsis" || (n >= 1 && n <= total)
  );
}
export default getPageNumbers;
