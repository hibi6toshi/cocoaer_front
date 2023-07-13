import { useNavigate } from "react-router-dom";
import { Project } from "../../types";
import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";
import UserMiniInfo from "../../components/Users/UserMiniInfo";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project
}) => {
  const navigate = useNavigate();
  const { getCategoryName } = useCategorys();
  const { getTargetName } = useTargets();

  return (
    <div 
      onClick={()=> navigate(`/projects/${project.id}`)}
      className="
        cursor-pointer 
        overflow-hidden 
        shadow-sm
        m-2
        rounded-xl
        border-[1px]
        p-4
        grid
        grid-cols-4
        transition
        hover:shadow-lg
        hover:scale-105
      "
    >
      <div className="col-span-3 grid grid-rows-3">
        <div className="row-span-2 text-lg font-bold">
          {project.title}
        </div>
        <div className="row-span-1">
          <UserMiniInfo user={project.user} />
        </div>
      </div>
      <div className="col-span-1 mx-4">
        { project.limit_day 
          ?
            <div>{ new Date(project.limit_day.slice(0,10)).toLocaleDateString() }</div>
          :
            <></>
        }
        
        <div>{ getCategoryName(project.piety_target_id) }</div>
        <div>{ getTargetName(project.piety_category_id)}</div>
      </div>
    </div>
   );
}
 
export default ProjectCard;