import { useAuth0 } from "@auth0/auth0-react";
import { getProject } from "../../apis/projects";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "../../types";
import ProjectInfo from "../../features/projects/ProjectInfo";
import CommentsView from "../../features/comments/CommentsView";
import Loading from "../../components/Elements/Loading";
import { toast } from "react-hot-toast";

const loader = async (token: string,  projectId:string ) => {
  if (!projectId) {
    throw new Error("No id provided");
  }
  return  await getProject(token, projectId);
  
}

const ShowPage = () => {

  const {getAccessTokenSilently } = useAuth0();
  const { projectId } = useParams();
  const [ project, setProject] = useState<Project>();
  const navigate = useNavigate();

  useEffect(()=>{
    if(projectId == null) return 
    const initAction = async () => {
      const token = await getAccessTokenSilently();

      loader(token, projectId)
        .then(res => {
          setProject(res.data.data);
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
        })
    }
    initAction()
  }
  ,[])

  if(projectId == null){
    return <div>fail to get projectId ;_;</div>
  }

  if(project == null){
    return <div><Loading /></div>
  }

  return (
    <>
      <ProjectInfo 
        project={project}
      />
      {/* <CommentsView 
        commentableType="Project"
        commentableId={project.id}
        commentableOwner={project.user}
      /> */}
    </>
   );
}
 
export default ShowPage;