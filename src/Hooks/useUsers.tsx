import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: string;
}

const useUsers = () => {
  const [data, setData] = useState<User | null>(null); // Adjust the type as needed

  useEffect(() => {
    const storedData = localStorage.getItem("id");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://inventory-management-backend-nu.vercel.app/users/${data}/`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [data]);

  return [user];
};

export default useUsers;
