import axios from 'axios';
import Cookies from 'js-cookie';

// Define a function that makes the API request and returns a promise
const getUserData = async () => {
  const token = Cookies.get('token'); // Replace with your actual JWT token

  // Define the API URL
  const apiUrl = 'https://api.carbon-greentravel.com/api/get-user'; // Make sure to include the full URL

  // Set the headers for the request
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // You may need to set other headers as needed
  };

  try {
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
        Cookies.set('user_idCk',response.data.data.id);
      return response.data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    throw error;
  }
};

export default getUserData;
