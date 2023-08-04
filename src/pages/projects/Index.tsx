import { LoaderFunction, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { getProjects } from "../../apis/projects";
import ProjectCard from "../../features/projects/ProjectCard";
import { PaginationInfo, Project } from "../../types";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Elements/Button";

export const loader: LoaderFunction = async ({ request } :LoaderFunctionArgs) => {
  const projects = await getProjects((new URL(request.url)));

  return { projects: projects.data, pagination_info: projects.pagination_info };
}

const IndexPage = () => {
  const { projects, pagination_info} = useLoaderData() as { projects: Project[], pagination_info: PaginationInfo};
  const navigate = useNavigate();

  if (projects.length === 0 ){
    return (
      <div className="flex justify-center">
        <div className="mt-32 font-bold text-lg">
          "No Project found"
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="flex justify-center">
        <div className="w-40">
          <Button
            label="新規作成"
            onClick={()=>navigate("/projects/new")}
            rounded_full
          />
        </div>
      </div>
    
      <div className="
        max-w-4xl
        mx-auto
        grid
        grid-cols-1
        m-4
      "> 
        {projects?.map((project: Project)=>(
          <ProjectCard 
            project={project}
            key={project.id}
          />
        ))}
      </div>
      <div className="mt-8">
        <Pagination pagination_info={pagination_info}/>
      </div>
    </>
   );
}
 
export default IndexPage;