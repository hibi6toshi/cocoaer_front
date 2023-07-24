import { Outlet, useLocation } from "react-router-dom";
import NavTabs from "../../components/Elements/NavTabs";

const navTagDatas = [
  {
    label: "articles",
    navTo: "articles"
  },
  {
    label: "projects",
    navTo: "projects"
  },
  {
    label: "forums",
    navTo: "forums"
  },
]

const IndexPage = () => {
  return ( 
    <>
      <div className="container mx-auto px-4">
      <NavTabs navTabDatas={navTagDatas}/>
        <Outlet />
      </div>
    </>
  );
}
 
export default IndexPage;