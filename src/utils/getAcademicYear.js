export const getAcademicYearMonths = () => {
  const months = [
    "سبتمبر", 
    "أكتوبر", 
    "نوفمبر", 
    "ديسمبر", 
    "جانفي",  
    "فيفري",  
    "مارس",   
    "أفريل",  
    "ماي",    
    "جوان",   
    "جويليه"
  ];

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let nextYear = currentYear + 1;
  
  // Academic year starts in September (month index 8)
  if (currentDate.getMonth() < 8) {
    currentYear--;
    nextYear--;
  }

  return months.map((month, index) => {
    if (index < 4) {
      // Months: Sep–Dec → currentYear
      const utcDate = new Date(Date.UTC(currentYear, index + 8, 1, 0, 0, 0, 0));
      return {
        label: `${month} ${currentYear}`,
        iso: utcDate.toISOString()
      };
    } else {
      // Months: Jan–Aug → nextYear
      const monthNumber = index - 4; // 0 = Jan
      const utcDate = new Date(Date.UTC(nextYear, monthNumber, 1, 0, 0, 0, 0));
      return {
        label: `${month} ${nextYear}`,
        iso: utcDate.toISOString()
      };
    }
  });
};
export const getCurrentAcademicYear = () => {
    const now = new Date();
    let startYear = now.getFullYear();
    let endYear = startYear + 1;

    if (now.getMonth() < 8) {
        startYear -= 1;
        endYear -= 1;
    }

    return `${startYear}-${endYear}`;
}