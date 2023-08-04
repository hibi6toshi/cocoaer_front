import { useEffect, useReducer, useState } from "react";
import ForumForm from "../../features/forums/ForumForm";
import { FormForum } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";
import { getEditForum, updateForum } from "../../apis/forums";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Elements/Loading";

const initFormForum: FormForum = {
  id: "",
  piety_target_id : "",  
  piety_category_id : "",  
  days : "",
  cost : "",
  title : "", 
  body : "", 
  warningTitle: null,
  warningBody: null,
}

const loader = async (token: string,  forumId:string ) => {
  if (!forumId) {
    throw new Error("No id provided");
  }
  return await getEditForum(token, forumId);
}

const EditPage = () => {

  const [ formForum, setFormForum] = useReducer(
    (formForum: FormForum, newDetails: any): FormForum => ({...formForum, ...newDetails}),
    initFormForum
  )
  const navigate = useNavigate();
  const [ isSending, setIsSending ] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { forumId } = useParams();

  useEffect(()=>{
    if(forumId == null) return 
    const initAction = async () => {
      const token = await getAccessTokenSilently();
      loader(token, forumId)
        .then(res => {
          setFormForum(res.data.data);
        })
        .catch((e: any)=>{
          console.log(e)
          if(e?.response?.status === 404){
            toast.error("データが見つかりませんでした。");
            navigate("/forums")
            return ;
          }
          toast.error("something went wrong");
          navigate("/forums")
        })
    }
    initAction()
  }
  ,[])

  const submitAction= async() =>{
    if (isSending === true) return 
    if (forumId === undefined) return 
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
      updateForum(token, forumId, formData), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          // return err?.response?.data?.errors?.[0]?.length ? err.response.data.errors[0] : 'failed'
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

  if(formForum.id==="") return <div><Loading /></div>

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
 
export default EditPage;