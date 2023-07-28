import { User } from "../../types";

interface UserInfoHeaderProps {
  user: User;
}

const UserInfoHeader: React.FC<UserInfoHeaderProps> = ({
  user
}) => {
  return ( 
    <div className="p-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-8 md:flex-row">
        <img src={user.avatar?.url} alt="userIcon"  className="self-center flex-shrink-0 w-24 h-24 rounded-full md:justify-self-start" />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-center md:text-left">{user.name}</h4>
          <p className="text-base break-all whitespace-pre-wrap">{ user.introduction ? user.introduction : (<span className="text-neutral-400 italic">no introduction</span>)}</p>
        </div>
      </div>
    </div>
   );
}
 
export default UserInfoHeader;