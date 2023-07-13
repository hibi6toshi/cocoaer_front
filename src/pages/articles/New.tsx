import { useReducer, useState } from "react";
import { FormArticle } from "../../types";
import ArticleForm from "../../features/articles/ArticleForm";
import { useAuth0 } from "@auth0/auth0-react";
import { createArticle } from "../../apis/aricles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const initFormArticle: FormArticle = {
  piety_target_id : "1",  
  piety_category_id : "1",  
  days : "",
  cost : "",
  title : "", 
  body : "", 
  picture :  undefined,
  warningTitle: null,
  warningBody: null,
  // reducer関数で同一関数内でそれぞれを更新できないため却下 -> typeを引数にして、階層指定で変更できるようにする必要がある
  // warning: {
  //   title: null,
  //   body: null
  // }
}

const NewPage = () => {
  const [ formArticle, setFormArticle ] = useReducer(
    (formArticle: FormArticle, newDetails: any): FormArticle => ({...formArticle, ...newDetails}),
    initFormArticle); 

  const navigate = useNavigate();
  const [ isSending, setIsSending ] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const submitAction = async () => {
    if (isSending === true) return 

    setIsSending(true);
    const token = await getAccessTokenSilently(); 
    const formData = new FormData();
    formData.append("article[title]", formArticle.title);
    formData.append("article[body]", formArticle.body);
    if (formArticle.picture) formData.append("article[picture]", formArticle.picture);
    formData.append("article[piety_category_id]", formArticle.piety_category_id);
    formData.append("article[piety_target_id]", formArticle.piety_target_id);
    if (formArticle.days) formData.append("article[days]", formArticle.days);
    if (formArticle.cost) formData.append("article[cost]", formArticle.cost);

    await toast.promise(
      createArticle(token, formData), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          return err?.response?.data?.errors[0]?.length >0 ? err.response.data.errors[0] : "faild"
        },
      }).then((res)=>{
        console.log(res)
        navigate(`/articles/${res.data.data.id}`);
      }).catch(e =>{
        console.log(e)
      }        
    );
    setIsSending(false);
  };

  return (
    <div>new{}
      <ArticleForm 
        article={formArticle}
        dispatch={setFormArticle}
        submitAction={() => submitAction()}
        isSending={isSending}
      />
    </div>
   );
}
 
export default NewPage;