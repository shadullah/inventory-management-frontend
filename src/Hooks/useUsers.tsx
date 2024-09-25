import axios from "axios";
import { useEffect, useState } from "react";

const useUsers = () => {
  const userId = localStorage.getItem("id");

  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/users/${userId}/`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  return [user];
};

export default useUsers;
