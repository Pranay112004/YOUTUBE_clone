import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../utils/rapidapi.js"; // Correct path

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New"); // Initial query

  const fetchAllData = async (query) => {
    setLoading(true);
    try {
      const { data: responseData, error } = await fetchData(
        `search/?q=${query}&part=snippet`
      );
      if (error) throw error;
      setData(responseData.items || []); // Extract items from the response
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // Reset data on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData(value); // Fetch data on mount and when value changes
  }, [value]);

  return (
    <AuthContext.Provider value={{ loading, data, value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
