import { useNavigate } from "react-router-dom";
import { User } from "../../types";

interface UserMiniInfoProps {
  user: User
  fontbold?: boolean
}

const UserMiniInfo: React.FC<UserMiniInfoProps> = ({
  user,
  fontbold
}) => {

  const hundleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // cardでのevent伝播防止
    navigate(`/users/${user.id}`)
  }

  const navigate = useNavigate();

  return (
    <div
      className="
        z-10
        flex
        flex-row
    ">
      <span
        className="
          cursor-pointer
          hover:underline"
      >
        <span className="flex flex-row" onClick={hundleOnClick}>
          <img src={user?.avatar?.url} alt="userIcon" 
            width={25} height={25} 
            className="rounded-full"
          />
          {/* <span className="
            mx-2
          ">{user.name}</span> */}
          <span className={`
              mx-2
              ${fontbold && "font-bold"}
            `}>{user.name}</span>
          </span>
      </span>
    </div>
   );
}
 
export default UserMiniInfo;