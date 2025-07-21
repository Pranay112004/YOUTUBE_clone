import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "youtube138.p.rapidapi.com",
  },
};

export const fetchData = async (url, customOptions = {}) => {
  const mergedOptions = { ...options, ...customOptions };
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, mergedOptions);
    if (!data) throw new Error("No data returned from API");
    return { data, error: null };
  } catch (error) {
    console.error("Error Fetching api data:", error);
    return { data: null, error };
  }
};
