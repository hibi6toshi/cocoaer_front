import { Outlet } from "react-router-dom";
import { AuthenticationGuard } from "./AuthenticationGuard";

const OutletFunc = () => {
  return <Outlet />
}

const AuthenticationGuardWithOutlet= () => {
  return (
    <AuthenticationGuard 
      component={OutletFunc}
    />
  );
}
 
export default AuthenticationGuardWithOutlet;