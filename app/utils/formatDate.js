  // Format date to display in a readable format
  export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  /**
 * Extracts just the month and day from a date string in the format "Month Day"
 * Example: "March 12"
 * 
 * @param {string} dateString - ISO date string (e.g., "2025-05-04T20:14:09.544Z")
 * @returns {string} Formatted date as "Month Day"
 */
export const extractMonthDay = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return '';
  
  return date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long'
  });
};

// Example usage:
// extractMonthDay("2025-05-04T20:14:09.544Z") -> "May 4"
// extractMonthDay("2025-03-12T10:00:00.000Z") -> "March 12"