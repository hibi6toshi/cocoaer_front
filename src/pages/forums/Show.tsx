import ForumInfo from "../../features/forums/ForumInfo";
import { getForum } from "../../apis/forums";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Forum } from "../../types";
import CommentsView from "../../features/comments/CommentsView";
import Loading from "../../components/Elements/Loading";
import { toast } from "react-hot-toast";

const loader = async (token: string,  forumId:string ) => {
  if (!forumId) {
    throw new Error("No id provided");
  }
  
  return await getForum(token, forumId);
}

const ShowPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { forumId } = useParams();
  const [forum, setForum] = useState<Forum>();
  const navigate = useNavigate();

  useEffect(()=>{
    if(forumId == null) return 
    const initAction = async () => {
      const token = await getAccessTokenSilently();

      loader(token, forumId)
        .then(res => {
          // 成功時の処理
          setForum(res.data.data);
        })
        .catch((e: any)=>{
          console.log(e)
          if(e?.response?.status === 404){
            toast.error("データが見つかりませんでした。");
            navigate("/forums")
            return ;
          }
          toast.error("something went wrong");
          navigate("/forums")
        }); 
    }
    initAction()
  }
  ,[])

  if(forumId == null){
    return <div>fail to get forumId ;_;</div>
  }

  if(forum == null){
    return <div><Loading /></div>
  }

  return ( 
    <>
      <ForumInfo forum={forum}/>
      <CommentsView 
        commentableType="Forum"
        commentableId={forum.id}
        commentableOwner={forum.user}
      />
    </>
   );
}
 
export default ShowPage;