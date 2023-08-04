import { Outlet } from "react-router-dom";
import NavTabs from "../../components/Elements/NavTabs";

const navTagDatas = [
  {
    label: "C o C o",
    navTo: "articles"
  },
  {
    label: "プロジェクト",
    navTo: "projects"
  },
  {
    label: "フォーラム",
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