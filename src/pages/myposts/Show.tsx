import { useEffect, useState } from "react";
import { Article, Forum, Project, contentType } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";

import ArticleCard from "../../features/articles/ArticleCard";
import ProjectCard from "../../features/projects/ProjectCard";
import ForumCard from "../../features/forums/ForumCard";
import { getMyPosts } from "../../apis/myPost";

const loader = async (token :string, contentType: contentType ) => {
  if (!contentType) {
    throw new Error("No id contentType");
  }
  const  favorites = await getMyPosts(token, contentType);
  return favorites;
}

interface ShowPageProps {
  contentType: contentType;
}

const ShowPage: React.FC< ShowPageProps> = ({
  contentType,
}) => {

  const { getAccessTokenSilently } = useAuth0();
  const [ myposts,  setMyposts ] = useState([]);
  const [ isLoading, setIsLoading] = useState(false); 
  
  useEffect(()=>{
    setIsLoading(true);
    const initAction = async () =>{
      const token = await getAccessTokenSilently();
      const favoriteDatas = await loader(token, contentType);
      setMyposts(favoriteDatas?.data?.data)
      setIsLoading(false);
    }  
    initAction();
  }, [contentType])

  if(isLoading) {
    return (
      <div>Loading....</div>
    )
  }

  if(myposts.length===0){
    return (
      <div className="flex justify-center">
        <div className="mt-32 font-bold text-lg">
          No Post yet
        </div>
      </div>
    )
  }

  if(contentType === "Article"){
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
        {myposts.map((article: Article)=>(
          <ArticleCard 
            article={article}
            key={article.id}
          />
        ))}
      </div>
    );
  }

  if(contentType === "Project"){
    return (
      <div className="
        max-w-4xl
        mx-auto
        grid
        grid-cols-1
        m-4
      "> 
        {myposts?.map((project: Project)=>(
          <ProjectCard 
            project={project}
            key={project.id}
          />
        ))}
      </div>
    );
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
        {myposts?.map((forum: Forum)=>(
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