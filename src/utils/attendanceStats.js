export const attendanceStats = (data) => {
  const totals = data.reduce(
    (acc, item) => {
      if (item.status === "present" || item.status === "late") {
        acc.presentCount++;
      } else if (item.status === "absent") {
        acc.absentCount++;
      }
      return acc;
    },
    {
      presentCount: 0,
      absentCount: 0,
    }
  );

  totals.presentPercentage = data.length
    ? ((totals.presentCount / data.length) * 100).toFixed(0)
    : 0;

  return totals;
};
