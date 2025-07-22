import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../utils/rapidapi.js";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New");
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 5; // Fetch 5 videos at a time to respect API quota

  const fetchAllData = async (query, append = false) => {
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      console.warn("API call taking too long, using fallback data");
      setLoading(false);
      setError("API timeout");
    }, 10000);

    try {
      const { data: responseData, error: apiError } = await fetchData(
        `search/?q=${query}&limit=${limit}&offset=${append ? offset : 0}` // Use outer limit and include offset
      );

      clearTimeout(timeoutId);

      if (apiError) {
        console.error("API Error:", apiError);
        setError(apiError.message || "API Error");
        setData([]);
      } else {
        console.log("API Response:", responseData);

        const newItems = responseData?.contents || responseData?.items || [];

        setData((prev) => (append ? [...prev, ...newItems] : newItems));
        if (append) {
          setOffset((prev) => prev + limit);
        } else {
          setOffset(limit);
        }
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Error fetching data:", error);
      setError(error.message || "Network Error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value && value.trim()) {
      fetchAllData(value, false);
    } else {
      setLoading(false);
      setData([]);
    }
  }, [value]);

  return (
    <AuthContext.Provider
      value={{ loading, data, value, setValue, error, fetchAllData, limit }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
