import { useAuth0 } from "@auth0/auth0-react";
import { getProject } from "../../apis/projects";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../types";
import ProjectInfo from "../../features/projects/ProjectInfo";
import CommentsView from "../../features/comments/CommentsView";

const loader = async (token: string,  projectId:string ) => {
  if (!projectId) {
    throw new Error("No id provided");
  }
  const  Project = await getProject(token, projectId);
  return Project.data
}

const ShowPage = () => {

  const {getAccessTokenSilently } = useAuth0();
  const { projectId } = useParams();
  const [ project, setProject] = useState<Project>();

  useEffect(()=>{
    if(projectId == null) return 
    const initAction = async () => {
      const token = await getAccessTokenSilently();
      const project = await loader(token, projectId);
      setProject(project);
    }
    initAction()
  }
  ,[])

  if(projectId == null){
    return <div>fail to get projectId ;_;</div>
  }

  if(project == null){
    return <div>loading...</div>
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