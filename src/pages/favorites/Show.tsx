import { useEffect, useState } from "react";
import { Article, FavoritableType, Forum, PaginationInfo, Project } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";
import { getFavorites } from "../../apis/favorites";
import ArticleCard from "../../features/articles/ArticleCard";
import ProjectCard from "../../features/projects/ProjectCard";
import ForumCard from "../../features/forums/ForumCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const loader = async (token :string, favoritableType: FavoritableType, searchParams: URLSearchParams) => {
  if (!favoritableType) {
    throw new Error("No id favoritableType");
  }
  const  favorites = await getFavorites(token, favoritableType, searchParams);
  return favorites;
}

interface ShowPageProps {
  favoritableType:  FavoritableType;
}

const ShowPage: React.FC< ShowPageProps> = ({
  favoritableType,
}) => {

  const { getAccessTokenSilently } = useAuth0();
  const [ favorites,  setFavorites ] = useState([]);
  const [ isLoading, setIsLoading] = useState(false); 
  const [ pagination_info, setPagination_info ] = useState<PaginationInfo>()

  let [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(()=>{
    setIsLoading(true);
    const initAction = async () =>{
      const token = await getAccessTokenSilently();
      const favoriteDatas = await loader(token, favoritableType, searchParams);
      setFavorites(favoriteDatas?.data?.data);
      setPagination_info(favoriteDatas?.data.pagination_info);
      setIsLoading(false);
    }  
    initAction();
    console.log(favorites);
  }, [favoritableType, searchParams])

  let body;

  if(isLoading) {
    return <div>Loading....</div>
  }

  if(favorites.length===0){
    return (
      <div className="flex justify-center">
        <div className="mt-32 font-bold text-lg">
          No favorite yet
        </div>
      </div>
    )
  }

  if(favoritableType === "Article"){
    body = (
      <div className="
        container 
        mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        ms:grid-cols-3
        lg:grid-cols-3  
      ">
        {favorites.map((article: Article)=>(
          <ArticleCard 
            article={article}
            key={article.id}
          />
        ))}
      </div>
    );
  }

  if(favoritableType === "Project"){
    body = (
      <div className="
        max-w-4xl
        mx-auto
        grid
        grid-cols-1
        m-4
      ">
        {favorites?.map((project: Project)=>(
          <ProjectCard 
            project={project}
            key={project.id}
          />
        ))}
      </div>
    );
  }

  if(favoritableType === "Forum"){
    body = (
      <div className="
        max-w-4xl
        mx-auto
        grid
        grid-cols-1
        m-4
      "> 
        {favorites?.map((forum: Forum)=>(
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
      {body}
      { 
        pagination_info &&
          <Pagination 
            pagination_info={pagination_info}
          />
      }
    </div>
  );
}
 
export default ShowPage;