import React, { useState } from "react";
import { MyContext } from "./MyContext";

interface ProviderProps {
  children: React.ReactNode;
}

const MyProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [userData, setUserData] = useState<{ email: string; password: string } | null>(null);

  return (
    <MyContext.Provider value={{ userData, setUserData }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider; 