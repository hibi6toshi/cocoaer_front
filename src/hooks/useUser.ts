import { UserContextValue, useUserContext } from "../providers/UserProvider";
import { User } from "../types";

const useUser = () => {
  const { user }   = useUserContext() as UserContextValue;

  return {
    user
  };
}

export default useUser;