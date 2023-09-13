import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Navbar from "../../features/layouts/Navbar";
import Footer from "../../features/layouts/Footer";
import { Toaster } from "react-hot-toast";
import useWindowSize from "../../hooks/useWindowSize";
import usePageTracking from "../../hooks/usePageTracking";

const Layout = () => {
  const [ width, height ] = useWindowSize();
  const navigation = useNavigation();
  usePageTracking()

  return ( 
    <div className="flex flex-col min-h-screen text-gray-700">
      <Toaster />
      <Navbar />
      <div className={`
        flex-grow
        pb-10
        ${ width > 550 ? "pt-20" : "pt-24" }
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