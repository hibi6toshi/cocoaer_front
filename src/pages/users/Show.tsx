import { useAuth0 } from "@auth0/auth0-react";
import { Article, Forum, Project, contentType } from "../../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserArticles, getUserForums, getUserProjects } from "../../apis/users";
import ArticleCard from "../../features/articles/ArticleCard";
import ProjectCard from "../../features/projects/ProjectCard";
import ForumCard from "../../features/forums/ForumCard";
import Loading from "../../components/Elements/Loading";

interface ShowPageProps {
  contentType : contentType;
}


const loader = async (token: string, userId: string, contentType: contentType) => {
  let rtnVal= {data: {data: []}};
  switch (contentType) {
    case "Article":
      return await getUserArticles(token, userId);
    case "Project":
      return await getUserProjects(token, userId);
    case "Forum":
      return await getUserForums(token, userId);
    default:
      break;
  }
  return rtnVal;
}

const ShowPage: React.FC<ShowPageProps> = ({
  contentType
}) => {

  const { userId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [ contents, setContents ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(()=>{
    if(!userId){return}
    setIsLoading(true);
    const initAction = async () =>{
      const token = await getAccessTokenSilently();
      const contentsData = await loader(token, userId, contentType);
      setContents(contentsData?.data?.data)
      setIsLoading(false);
    }  
    initAction();
  }, [contentType])

  if(isLoading===true){
    return (
      <div><Loading /></div>
    )
  }

  if(contents.length===0){
    return (
      <div className="flex justify-center">
        <div className="mt-32 font-bold text-lg">
          No Post yet
        </div>
      </div>
    )
  }

  if(contentType==="Article"){
    return (
      <div className="
        container 
        mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        ms:grid-cols-3
        lg:grid-cols-3  
      ">
        {contents.map((contents :Article)=>(
          <ArticleCard 
            article={contents}
            key={contents?.id}
          />
        ))}
      </div>
    )
  }

  if(contentType==="Project"){
    return (
      <div className="
        max-w-4xl
        mx-auto
        grid
        grid-cols-1
        m-4
      ">
        {contents.map((contents :Project)=>(
          <ProjectCard
            project={contents}
            key={contents?.id}
          />
        ))}
      </div>
    )
  }

  if(contentType === "Forum"){
    return (
      <div className="
        max-w-4xl
        mx-auto
        grid
        grid-cols-1
        m-4
      "> 
        {contents?.map((forum: Forum)=>(
          <ForumCard
            forum={forum}
            key={forum.id}
          />
        ))}
      </div>
    );
  }

  return ( 
    <div>

    </div>
  );
}
 
export default ShowPage;