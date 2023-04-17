import React from "react";

interface UserData {
  email: string;
  password: string;
}

interface ContextProps {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const MyContext = React.createContext<ContextProps>({
  userData: null,
  setUserData: () => {},
});