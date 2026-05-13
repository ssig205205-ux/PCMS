import { createContext, useState } from "react";

//eslint-disable-next-line
export const DetailIdContext = createContext();

export const DetailIdProvider = ({ children }) => {
  const [detailId, setDetailId] = useState(null);

  return (
    <DetailIdContext.Provider value={{ detailId, setDetailId }}>
      {children}
    </DetailIdContext.Provider>
  );
};