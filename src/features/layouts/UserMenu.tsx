import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { BiUser, BiMenu } from "react-icons/bi";
import MenuItem from "../../components/Elements/MenuItem";
import { useNavigate } from "react-router-dom";
import { createUser } from '../../apis/users'
import { useUserContext } from "../../providers/UserProvider";
import Loading from "../../components/Elements/Loading";

const UserMenu = () => {

  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently, isLoading, user: auth0User} = useAuth0();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  // login時に、userの名前、画像をupdateする？
  // userの名前、画像はauth0で管理する？
  // userはlogin時にrails apiと照会。なければ作る。paramに画像をつけて、それをAPIで保存
  // Auth0側でクエリ制限があるので、逐次呼び出さないためにAPIで抱える。

  useEffect(()=>{
    if(auth0User){
      console.log("userApi照会");
      const doCreateUser = async()=>{
        const token = await getAccessTokenSilently({}); 
        return await createUser(token, auth0User);
      };
      doCreateUser()
      .then(data => setUser({id: data.id, avatar: data.avatar, name: data.name}))
    }else{
      setUser(null);
    }
  }, [auth0User, getAccessTokenSilently, setUser])

  return ( 
    <div>
      {
        isLoading
          ? <Loading />
          :
           isAuthenticated 
            ? <div className="group relative inline-block text-left" tabIndex={-1}>
                <div className="
                    cursor-pointer
                    rounded-full
                    border-[1px] 
                    border-yellow-700 border-opacity-75
                    flex
                    flex-row
                    items-center
                    gap-3
                    md:gap-0
                    px-1
                    py-1
                    transition 
                    hover:shadow-md
                ">
                  <BiMenu 
                    size={24}
                    className="p-1"
                  />
                  <img src={user?.avatar?.url} alt="userIcon" 
                    width={25} height={25} 
                    className="self-center flex-shrink-0 w-6 h-6 rounded-full md:justify-self-start"
                  />
                </div>
                <div className="
                  invisible 
                  opacity-0 
                  transition-all 
                  duration 
                  scale-95 
                  group-focus-within:visible 
                  group-focus-within:translate-y-0 
                  group-focus-within:scale-100 
                  group-focus-within:opacity-100
                ">
                  <div className="absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none" role="menu">
                    <div className="px-4 py-3">
                      <p className="text-sm leading-5">{user?.name}</p>
                    </div>

                    <div className="py-1">
                      <MenuItem onClick={()=>navigate("/favorites")} label="Favorites"/>
                      <MenuItem onClick={()=>navigate("/myposts")} label="Myposts"/>
                      <MenuItem onClick={()=>navigate("/Profile")} label="Profile"/>
                    </div>

                    <div className="py-1">
                      <MenuItem onClick={()=>logout()} label="Sign out" />
                    </div>
                  </div>
                </div>
              </div>
            : <div className="
                  cursor-pointer
                  rounded-full
                  border-[1px] 
                  border-blue-700 border-opacity-75
                  flex
                  flex-row
                  items-center
                  gap-3
                  md:gap-0
                  px-2
                  py-1
                  transition 
                  hover:shadow-md
                "
                onClick={()=>loginWithRedirect()}
              >
                <BiUser 
                  size={24}
                  color={'#3482F6'}
                  className="
                    rounded-full
                    border-[1px] 
                    border-blue-700 border-opacity-75
                  "
                />
                <div className="px-2 text-blue-700 text-opacity-75">Login</div>
              </div>
      }
    </div>
   );
}
 
export default UserMenu;