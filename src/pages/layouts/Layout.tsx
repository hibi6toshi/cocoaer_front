import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../../features/layouts/Navbar";
import Footer from "../../features/layouts/Footer";

const Layout = () => {
  const navigation = useNavigation();
  return ( 
    <div className="flex flex-col min-h-screen text-gray-700">
      <Navbar />
      {/* <div className="flex-grow pb-10 pt-24"> */}
      <div className={`
        flex-grow
        pb-10
        pt-24
        ${navigation.state === "idle" ? '' : 'opacity-50'}
      `}>
        <Outlet />
      </div>
      <Footer />
    </div>
   );
}
 
export default Layout;