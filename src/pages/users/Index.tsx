import { Outlet, useParams } from "react-router-dom";
import NavTabs from "../../components/Elements/NavTabs";
import { getUser } from "../../apis/users";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserInfoHeader from "../../components/Users/UserInfo";
import Loading from "../../components/Elements/Loading";

const navTagDatas = [
  {
    label: "C o c o",
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

const loader = async (token: string, userId: string ) => {
  const user = await getUser(token, userId);
  return user.data.data;
}

const IndexPage = () => {
  
  const { userId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [ user, setUser ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(()=>{
    if(userId == null) return 
    const initAction = async () => {
      setIsLoading(true)
      const token = await getAccessTokenSilently();
      const user = await loader(token, userId);
      console.log(user);
      setUser(user);
      setIsLoading(false)
    }
    initAction()
  },[userId])

  if(isLoading===true){
    return <div><Loading /></div>
  }

  if(user === undefined){
    return <div>no user</div>
  }

  return ( 
    <>
      <div className="container mx-auto px-4">
        <NavTabs 
          headerInfo={[<UserInfoHeader user={user} key="1" />]} 
          navTabDatas={navTagDatas}
        />
        <Outlet />
      </div>
    </>
  );
}
 
export default IndexPage;