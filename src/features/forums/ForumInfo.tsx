import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import { Forum } from "../../types";

interface ForumInfoProps {
  forum: Forum;
}

const ForumInfo: React.FC<ForumInfoProps> = ({
  forum
}) => {
  return ( 
    <div>
      <div className="
        md:container 
        md:mx-auto
        md:max-w-2xl
        overflow-hidden 
        shadow-sm
        m-2
        rounded-xl
        border-[1px]
        p-4
      ">
        <div className="rounded-xl border-[1px] p-4">
          <div className="
            font-bold
            text-xl
            mb-4
          ">
            {forum.title}
          </div>
          
          <hr />

          <div className="my-4">
            <div>{forum.body}</div>
          </div>
          <hr />

          <div className="my-4"><UserMiniInfo user={forum.user}/></div>

          <OptionalInfo
            piety_target_id={forum.piety_target_id}
            piety_category_id={forum.piety_category_id}
            days={forum.days}
            cost={forum.cost}
          />
        </div>
      </div>
    </div>
   );
}
 
export default ForumInfo;