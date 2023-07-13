import ForumInfo from "../../features/forums/ForumInfo";
import { getForum } from "../../apis/forums";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Forum } from "../../types";

const loader = async (token: string,  forumId:string ) => {
  if (!forumId) {
    throw new Error("No id provided");
  }
  const forum = await getForum(token, forumId);
  return forum.data
}

const ShowPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { forumId } = useParams();
  const [forum, setForum] = useState<Forum>();

  useEffect(()=>{
    if(forumId == null) return 
    const initAction = async () => {
      const token = await getAccessTokenSilently();
      const forum = await loader(token, forumId);
      setForum(forum);
    }
    initAction()
  }
  ,[])

  if(forumId == null){
    return <div>fail to get forumId ;_;</div>
  }

  if(forum == null){
    return <div>loading...</div>
  }

  return ( 
    <>
      <ForumInfo forum={forum}/>
    </>
   );
}
 
export default ShowPage;