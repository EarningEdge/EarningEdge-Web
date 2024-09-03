const currentISTHour = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  ).getHours();

  // Determine the greeting based on the hour
  export const getGreeting = () => {
    if (currentISTHour >= 4 && currentISTHour < 6) {
      return 'Good early morning';
    } else if (currentISTHour >= 6 && currentISTHour < 12) {
      return 'Good morning';
    } else if (currentISTHour >= 12 && currentISTHour < 16) {
      return 'Good afternoon';
    } else if (currentISTHour >= 16 && currentISTHour < 20) {
      return 'Good evening';
    } else if (currentISTHour >= 20 && currentISTHour < 23) {
      return 'Good night';
    } else {
      return 'Good late night';
    }
  };