import { useNavigate } from "react-router-dom";
import { User } from "../../types";

interface UserMiniInfoProps {
  user: User
}

const UserMiniInfo: React.FC<UserMiniInfoProps> = ({
  user
}) => {
  const navigate = useNavigate();

  return ( 
    <div
      className="
        z-10
        flex
        flex-row
        cursor-pointer
        hover:underline
      "
      onClick={()=>navigate(`/users/${user.id}`)}
    >
      <img 
       // src='{%PUBLIC_URL%}/favicon.ico}' 
        src={`${process.env.PUBLIC_URL}/favicon.ico`}
        alt="userIcon" 
        width={25} height={25} 
        className="rounded-full"
      />
      <div className="
        mx-2
      ">{user.id}</div>
    </div>
   );
}
 
export default UserMiniInfo;