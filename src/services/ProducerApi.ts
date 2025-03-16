import axios from 'axios';

const API_URL = 'http://localhost:3000';

//שליפת ארועים לפי מייל

export const getEventsByEmail = async (email: string) => {
    try {
      const response = await axios.get(`${API_URL}/event?email=${email}`);
     //אולי נצטרך לשנות את השורה הבאה לפי המבנה של המידע שנקבל מהשרת
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };