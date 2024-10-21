import getLocation from './locationService';

const getUserCurrency = async (): Promise<string> => {
    try {
      const country = await getLocation();
      return country;
    } catch (error) {
      console.error("Failed to fetch user currency", error);
      return "US"; // Default to US if fetching fails
    }
  }
  
  export default getUserCurrency;