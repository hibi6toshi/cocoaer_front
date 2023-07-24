import { toast } from "react-hot-toast";
import useFavorites from "../../hooks/useFavorites";
import IconButton from "../../components/Elements/IconButton";
import { PiHeartStraightFill, PiHeartStraight } from "react-icons/pi"
import useUser from "../../hooks/useUser";
import { FavoritableType } from "../../types";

interface FavoriteButtonProps {
  initFavoritedUserIds: number[];
  favoritableType: FavoritableType;
  favoritableId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  initFavoritedUserIds,
  favoritableType,
  favoritableId
}) => {

  const { user } = useUser();

  const { favoritedUserIds, toggleFavorite, isFavorited } = useFavorites({
    initFavoritedUserIds: initFavoritedUserIds,
    favoritableType: favoritableType,
    favoritableId: favoritableId
  });

  const doToggleFavorite = async(e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    await toast.promise(
      toggleFavorite(), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          return "faild"
        },
      }).then((res)=>{
        console.log(res)
      }).catch(e =>{
        console.log(e)
      }        
    );
  }

  if(!user){return (null);}
  return ( 
    <div className="flex justify-center">
      <span className="text-sm">{favoritedUserIds.length}</span>
      {isFavorited 
        ?       
          <IconButton
            icon={PiHeartStraightFill}
            onClickIcon={doToggleFavorite}
            color="hotpink"
          />
        : 
          <IconButton
            icon={PiHeartStraight}
            onClickIcon={doToggleFavorite}
          />
      }
    </div>
   );
}

export default FavoriteButton;