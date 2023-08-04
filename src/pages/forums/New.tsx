import { useReducer, useState } from "react";
import ForumForm from "../../features/forums/ForumForm";
import { FormForum } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";
import { createForum } from "../../apis/forums";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initFormForum: FormForum = {
  id: "",
  piety_target_id : "1",  
  piety_category_id : "1",  
  days : "",
  cost : "",
  title : "", 
  body : "", 
  warningTitle: null,
  warningBody: null,
}

const NewPage = () => {

  const [ formForum, setFormForum] = useReducer(
    (formForum: FormForum, newDetails: any): FormForum => ({...formForum, ...newDetails}),
    initFormForum
  )
  const navigate = useNavigate();
  const [ isSending, setIsSending ] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const submitAction= async() =>{
    if (isSending === true) return 
    setIsSending(true);

    const token = await getAccessTokenSilently();
    const formData = new FormData();

    formData.append("forum[title]", formForum.title);
    formData.append("forum[body]", formForum.body);
    formData.append("forum[piety_category_id]", formForum.piety_category_id);
    formData.append("forum[piety_target_id]", formForum.piety_target_id);
    formData.append("forum[days]", formForum.days);
    formData.append("forum[cost]", formForum.cost);
    
    await toast.promise(
      createForum(token, formData), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          // return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : 'faild'
          return 'faild'
        },
      }).then((res)=>{
        console.log(res)
        navigate(`/forums/${res.data.data.id}`);
      }).catch(e =>{
        console.log(e)
      }        
    );
    setIsSending(false);
  }

  return (
    <>
      <ForumForm 
        forum={formForum}
        dispatch={setFormForum}
        submitAction={submitAction}
        isSending={isSending}
      />
    </> 
   );
}
 
export default NewPage;