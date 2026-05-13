// ScreenSizeContext.jsx

import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
  const isMobile = useMediaQuery({
    maxWidth: 800,
  });

  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1023,
  });

  const isDesktop = useMediaQuery({
    minWidth: 1024,
  });

  const value = {
    isMobile,
    isTablet,
    isDesktop,
  };

  return (
    <ScreenSizeContext.Provider value={value}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
//eslint-disable-next-line
export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};