import { useAuth0 } from "@auth0/auth0-react";
import { FormArticle } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { getEditArticle, updateArticle } from "../../apis/aricles";
import ArticleForm from "../../features/articles/ArticleForm";
import { toast } from "react-hot-toast";
import Loading from "../../components/Elements/Loading";

const initFormArticle: FormArticle = {
  id: "",
  piety_target_id : "",  
  piety_category_id : "1",  
  days : "",
  cost : "",
  title : "", 
  body : "", 
  picture :  {url: ""},
  imgPicture: undefined,
  warningTitle: null,
  warningBody: null,
}

const loader = async (token: string,  articleId:string ) => {
  if (!articleId) {
    throw new Error("No id provided");
  }
  return await getEditArticle(token, articleId);
}

const EditPage = () => {

  const {getAccessTokenSilently } = useAuth0();
  const { articleId } = useParams();
  const [ isSending, setIsSending ] = useState(false);
  const navigate = useNavigate();
  const [ prevPictureUrl, setPrevPictureUrl ] = useState("");

  const [ formArticle, setFormArticle ] = useReducer(
    (formArticle: FormArticle, newDetails: any): FormArticle => ({...formArticle, ...newDetails}),
    initFormArticle); 

  useEffect(()=>{
    if(articleId == null) return 
    const initAction = async () => {
      const token = await getAccessTokenSilently();
      loader(token, articleId)
        .then(res => {
          setFormArticle(res.data.data);
          setPrevPictureUrl(res.data.data.picture.url);
        })
        .catch((e: any)=>{
          console.log(e)
          if(e?.response?.status === 404){
            toast.error("データが見つかりませんでした。");
            navigate("/articles")
            return ;
          }
          toast.error("something went wrong");
          navigate("/farticles")
        })
    }
    initAction()
  }
  ,[])

  const submitAction = async () => {
    if (isSending === true) return 
    if (articleId === undefined) return 
    console.log(formArticle);
    let pitureChangedFlg = !(prevPictureUrl===formArticle.picture.url);

    setIsSending(true);
    const token = await getAccessTokenSilently(); 
    const formData = new FormData();
    formData.append("article[title]", formArticle.title);
    formData.append("article[body]", formArticle.body);
    if (pitureChangedFlg){
      if(formArticle.imgPicture){
        formData.append("article[picture]", formArticle.imgPicture);
      }else{
        formData.append("article[picture]", "");
      }
    }

    formData.append("article[piety_category_id]", formArticle.piety_category_id);
    formData.append("article[piety_target_id]", formArticle.piety_target_id);

    formData.append("article[days]", formArticle.days)
    formData.append("article[cost]", formArticle.cost)
    // 元々取得したformArticle.days が nullの場合、nullで送ってしまうとRailsで0扱いされるので、nullの場合は文字なしで送る。 costも同様
    if(formArticle.days==null){ formData.append("article[days]", '');} 
    if(formArticle.cost==null){ formData.append("article[cost]", '');} 

    await toast.promise(
      updateArticle(token, articleId, formData), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          // return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : "faild"
          return "faild"
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

  if(formArticle.id==="") return <div><Loading /></div>

  return ( 
    <div>
      <ArticleForm 
        article={formArticle}
        dispatch={setFormArticle}
        submitAction={submitAction}
        isSending={false}
      />
    </div>
   );
}
 
export default EditPage;