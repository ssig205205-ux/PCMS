
import { createContext, useState } from "react";

//eslint-disable-next-line
export const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName,setUserName] = useState("");

  return (
    <UserIdContext.Provider value={{ userId, setUserId,userName,setUserName }}>
      {children}
    </UserIdContext.Provider>
  );
};