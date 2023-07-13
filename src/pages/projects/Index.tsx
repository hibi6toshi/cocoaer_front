import { useLoaderData } from "react-router-dom";
import { getProjects } from "../../apis/projects";
import ProjectCard from "../../features/projects/ProjectCard";
import { Project } from "../../types";

export async function loader() {
  const projects = await getProjects();
  return projects.data;
}

const IndexPage = () => {
  const projects = useLoaderData() as Project[];

  return (
    <>
      <div>ProjectsIndexPage</div> 
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
    </>
   );
}
 
export default IndexPage;