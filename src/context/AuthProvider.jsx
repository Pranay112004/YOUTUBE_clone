import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../utils/rapidapi.js"; // Correct path

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true); // Start with loading true
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New"); // Initial query
  const [error, setError] = useState(null);

  const fetchAllData = async (query) => {
    setLoading(true);
    setError(null);
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn("API call taking too long, using fallback data");
      setLoading(false);
      setError("API timeout");
    }, 10000); // 10 second timeout

    try {
      const { data: responseData, error: apiError } = await fetchData(
        `search/?q=${query}`
      );
      
      clearTimeout(timeoutId);
      
      if (apiError) {
        console.error("API Error:", apiError);
        setError(apiError.message || "API Error");
        setData([]); // Use empty array, VideoGrid will show fallback
      } else {
        console.log("API Response:", responseData); // Debug log
        setData(responseData?.contents || responseData?.items || []); // Handle different response structures
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Error fetching data:", error);
      setError(error.message || "Network Error");
      setData([]); // Use empty array, VideoGrid will show fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // API is working! Re-enabled API calls
    console.log("AuthProvider mounted, fetching data from API");
    if (value && value.trim()) {
      fetchAllData(value);
    } else {
      setLoading(false);
      setData([]);
    }
  }, [value]);

  return (
    <AuthContext.Provider value={{ loading, data, value, setValue, error, fetchAllData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
