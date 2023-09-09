import { LoaderFunction, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { getProjects } from "../../apis/projects";
import ProjectCard from "../../features/projects/ProjectCard";
import { PaginationInfo, Project } from "../../types";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Elements/Button";
import ProjectSearchModal from "../../components/Modals/ProjectSearchModal";

export const loader: LoaderFunction = async ({ request } :LoaderFunctionArgs) => {
  const projects = await getProjects((new URL(request.url)));

  return { projects: projects.data, pagination_info: projects.pagination_info, q: projects.q };
}

const IndexPage = () => {
  const { projects, pagination_info} = useLoaderData() as { projects: Project[], pagination_info: PaginationInfo};
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center">
        <div className="w-80 flex flex-row justify-between">
          <div className="w-60">
            <Button
              label="新規作成"
              onClick={()=>navigate("/projects/new")}
              rounded_full
            />
          </div>
          <ProjectSearchModal />
        </div>
      </div>

      { projects.length === 0
        ? 
          <div className="flex justify-center mt-32 font-bold text-lg">
            "No Project found..."
          </div>
        :
          <>
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
      }
    </>
   );
}
 
export default IndexPage;