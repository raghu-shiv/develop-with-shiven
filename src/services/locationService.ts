import axios from 'axios';

const getLocation = async (): Promise<string> => {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    return response.data.country_code; // Returns the country code (e.g., "US", "IN", etc.)
  } catch (error) {
    console.error("Error fetching user location:", error);
    return "US"; // Default to US if there's an error
  }
};

export default getLocation;