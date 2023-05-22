import { useNavigate } from "react-router-dom";
import { Forum } from "../../types";

interface ForumCardProps {
  forum: Forum;
}

const ForumCard: React.FC<ForumCardProps> = ({
  forum
}) => {
  const navigate = useNavigate();

  return ( 
    <div
      onClick={()=>navigate(`/forums/${forum.id}`)} 
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
          {forum.title}
        </div>
        <div className="row-span-1">
          {forum.user.id}
        </div>
      </div>
      <div className="col-span-1 mx-4">
        <div>{ forum.days }</div>
        <div>{ forum.piety_target_id }</div>
        <div>{ forum.piety_category_id }</div>
      </div>
    </div>
   );
}
 
export default ForumCard;