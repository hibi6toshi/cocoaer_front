import { useEffect, useReducer, useState } from "react";
import { FormProject } from "../../types";
import ProjectForm from "../../features/projects/ProjectForm";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getEditProject, updateProject } from "../../apis/projects";

const initFormProject: FormProject = {
  id: "",
  piety_target_id : "1",  
  piety_category_id : "1",  
  limit_day : "",
  cost : "",
  title : "", 
  body : "", 
  warningTitle: null,
  warningBody: null,
  tasks: [],
  actions: [],
}

const loader = async (token: string,  forumId:string ) => {
  if (!forumId) {
    throw new Error("No id provided");
  }
  return await getEditProject(token, forumId);
}

const EditPage = () => {
  const [ formProject, setFormProject ] = useReducer(
    (formProject: FormProject, newDetails: any): FormProject => ({...formProject, ...newDetails}),
    initFormProject);
  
  const navigate = useNavigate();
  const [ isSending, setIsSending ] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { projectId } = useParams();

  useEffect(()=>{
    if(projectId == null) return 
    const initAction = async () => {
      const token = await getAccessTokenSilently();
      loader(token, projectId)
        .then(res => {
          setFormProject(res.data.data);
          console.log(res.data.data)
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

  const submitAction = async () =>{
    if (isSending === true) return 
    if (projectId === undefined) return
    setIsSending(true);

    const token = await getAccessTokenSilently();
    const formData = new FormData();

    formData.append("project_form[title]", formProject.title);
    formData.append("project_form[body]", formProject.body);
    formData.append("project_form[piety_category_id]", formProject.piety_category_id);
    formData.append("project_form[piety_target_id]", formProject.piety_target_id);
    formData.append("project_form[limit_day]", formProject.limit_day);
    formData.append("project_form[cost]", formProject.cost);
    formData.append("project_form[tasks]", JSON.stringify(formProject.tasks));
    formData.append("project_form[actions]", JSON.stringify(formProject.actions));

    await toast.promise(
      updateProject(token, projectId ,formData), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          return err?.response?.data?.errors[0]?.length >0 ? err.response.data.errors[0] : "faild"
        },
      }).then((res)=>{
        console.log(res)
        navigate(`/projects/${res.data.data.id}`);
      }).catch(e =>{
        console.log(e)
      }
    );
    setIsSending(false);
  }

  if(formProject.id === ""){return <div>Loading...</div> }

  return ( 
    <div>
      new project
      <ProjectForm 
        project={formProject}
        dispatch={setFormProject}
        submitAction={submitAction}
        isSending={isSending}
      />
    </div>
   );
}
 
export default EditPage;