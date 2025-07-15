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
  "جويليه",    
];

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let nextYear = currentYear + 1;
  
  if (currentDate.getMonth() < 8) {
    currentYear--;
    nextYear--;
  }

  return months.map((month, index) => {
    // Months from September to December (index 0-3)
    if (index < 4) {
      return {
        label: `${month} ${currentYear}`,
        iso: `${currentYear}-${(index + 9).toString().padStart(2, '0')}-01`
      };
    } 
    // Months from January to August (index 4-11)
    else {
      const monthNumber = index - 3;
      return {
        label: `${month} ${nextYear}`,
        iso: `${nextYear}-${monthNumber.toString().padStart(2, '0')}-01`
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