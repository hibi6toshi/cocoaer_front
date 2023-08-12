import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useReducer, useState } from "react";
import { getProfile, updateProfile } from "../../apis/profile";
import { FormUser, User } from "../../types";
import UserInfoHeader from "../../components/Users/UserInfo";
import IconButton from "../../components/Elements/IconButton";
import { BiPencil } from "react-icons/bi";
import ProfileForm from "../../features/profile/ProfileForm";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../providers/UserProvider";
import Loading from "../../components/Elements/Loading";
import Button from "../../components/Elements/Button";
import { deleteUser } from "../../apis/users";

const initFormUser = {
  id : "",
  avatar : {url: ""},
  imgAvatar: undefined,
  name: "",
  introduction: "",
  warningName: "",
}

const loader = (token: string) => {
  return getProfile(token);
}

const ShowPage = () => {

  const { getAccessTokenSilently, logout } = useAuth0();
  const [ profile, setProfile ] = useState<User>();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  const [ isSending, setIsSending ] = useState(false);
  const { setUser } = useUserContext();

  const [ formProfile, setFormProfile ] = useReducer(
    (formProfile: FormUser, newDetails: any): FormUser => ({...formProfile, ...newDetails}),
    initFormUser);

  useEffect(()=>{
    setIsLoading(true);
    const initAction = async () =>{
      const token = await getAccessTokenSilently();
      const profileData = await loader(token);
      setProfile(profileData?.data?.data)
      setFormProfile(profileData?.data?.data);
      setIsLoading(false);
    }  
    initAction();
  }, [])

  const onClickModeButton = () =>{
    setEditMode(prev => !prev);
  }

  const submitAction = async () => {
    if (isSending === true) return 
    let avatarChangedFlg = !(profile?.avatar?.url===formProfile.avatar.url);

    setIsSending(true);
    const token = await getAccessTokenSilently(); 
    const formData = new FormData();
    formData.append("profile[name]", formProfile.name);
    formData.append("profile[introduction]", formProfile.introduction);
    if (avatarChangedFlg){
      if(formProfile.imgAvatar){
        formData.append("profile[avatar]", formProfile.imgAvatar);
      }else{
        formData.append("profile[avatar]", "");
      }
    }


    await toast.promise(
      updateProfile(token, formData), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          // return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : "faild"
          return 'faild'
        },
      }).then((res)=>{
        console.log(res)
        setProfile(res.data.data);
        setUser(res.data.data);
        setEditMode(false);
      }).catch(e =>{
        console.log(e)
      }        
    );
    setIsSending(false);
  }


  const deleteUserAction = async () => {
    if (isSending === true) return 

    let checkSaveFlg = window.confirm('退会してよろしいですか？');
    if (!checkSaveFlg){
      return 
    } 

    setIsSending(true);
    const token = await getAccessTokenSilently(); 

    await toast.promise(
      deleteUser(token, String(profile?.id)), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          // return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : "faild"
          return 'faild'
        },
      }).then((res)=>{
        setUser(null);
        logout();
      }).catch(e =>{
        console.log(e)
      }        
    );
    setIsSending(false);
  }

  const cancelAction = () => {
    setEditMode(false);
  }

  if(isLoading){
    return (
      <div><Loading /></div>
    );
  }

  if(!profile){
    return (
      <div>fail to get Profile</div>
    )
  }

  if(editMode){
    return (
      <div className="container mx-auto px-10 sm:px-20">
        <ProfileForm 
          profile={formProfile}
          isSending={isSending}
          dispatch={setFormProfile}
          submitAction={submitAction}
          cancelAction={cancelAction}
        />
      </div>
    )
  }else{
    return ( 
      <div className="container mx-auto px-10 sm:px-20">
        <div className="font-bold mt-6">プロフィール</div>
        <UserInfoHeader user={profile}/>
        
        <div className="flex justify-center mt-40">
          <div className="w-40 mx-20">
            <Button 
              label="編集する"
              onClick={onClickModeButton}
            />
          </div>

          <div className="w-40 mx-20">
            <Button 
              label="退会する"
              onClick={deleteUserAction}
              outline
            />
          </div>
        </div>
      </div>
    );
  }
}
 
export default ShowPage;