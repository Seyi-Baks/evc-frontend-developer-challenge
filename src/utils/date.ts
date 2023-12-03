export const getGreetingBasedOnTime = (): string => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };


  export const extractTimeFromISOString = (ISOString: string): string  => {
    const date = new Date(ISOString);
    
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }