import { useCallback, useMemo, useState } from "react";
import useUser from "./useUser";
import { createFavorite, deleteFavorite } from "../apis/favorites";
import { useAuth0 } from "@auth0/auth0-react";
import { FavoritableType } from "../types";

interface UseFavoritesProps {
  initFavoritedUserIds: number[];
  favoritableType: FavoritableType;
  favoritableId: string;
}

const useFavorites = ({
  initFavoritedUserIds,
  favoritableType,
  favoritableId
}: UseFavoritesProps) => {

  const { user } = useUser();
  const [ favoritedUserIds, setFavoritedUserIds ] = useState(initFavoritedUserIds);
  const { getAccessTokenSilently } = useAuth0();

  const isFavorited = useMemo(()=>(
    favoritedUserIds.includes(Number(user?.id))
  ),[user, favoritedUserIds]);
  
  const toggleFavorite = useCallback(async() => {

    if(!user){
      return ;
    }

    const token = await getAccessTokenSilently();

    if(isFavorited){
      return deleteFavorite(token, favoritableType, favoritableId)
              .then((res) => {
                      setFavoritedUserIds(res.data.data.favorited_by_user_ids);
                      return res;
                    })
              .catch((e: any) => {throw e})
    }else{
      return createFavorite(token, favoritableType, favoritableId)
              .then((res) => {
                      setFavoritedUserIds(res.data.data.favorited_by_user_ids);
                      return res;
                    })
              .catch((e: any) => {throw e})
      // setFavoriteUserIds
    }
  }, [user, favoritedUserIds])

  return {
    favoritedUserIds,
    isFavorited,
    setFavoritedUserIds,
    toggleFavorite
  };
}
 
export default useFavorites;