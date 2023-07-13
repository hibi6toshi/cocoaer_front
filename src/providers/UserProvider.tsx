import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { User } from "../types";

interface Props {
  children?: React.ReactNode
};

export type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; 
}

const initUserContextVal = {
  user: null,
  setUser: () => {}
}

const userContext = createContext<UserContextValue>(initUserContextVal);
export const useUserContext = () => useContext(userContext);

const UserProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const userContextValue = { user, setUser};

  return (
    <userContext.Provider value={userContextValue}>
      {children}
    </userContext.Provider>
  );
}
 
export default UserProvider;