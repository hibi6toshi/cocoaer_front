import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Navbar from "../../features/layouts/Navbar";
import Footer from "../../features/layouts/Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const navigation = useNavigation();
  return ( 
    <div className="flex flex-col min-h-screen text-gray-700">
      <Toaster />
      <Navbar />
      {/* <div className="flex-grow pb-10 pt-24"> */}
      <div className={`
        flex-grow
        pb-10
        pt-24
        ${navigation.state === "idle" ? '' : 'opacity-50'}
      `}>
        <ScrollRestoration />
        <Outlet />
      </div>
      <Footer />
    </div>
   );
}
 
export default Layout;