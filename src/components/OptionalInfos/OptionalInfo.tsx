import { Link } from "react-router-dom";
import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";
import { ReactEventHandler } from "react";


interface OptionalInfoProps {
  piety_target_id: number;
  piety_category_id: number;
  days?: number;
  cost?: number;
  limit_day?: string;
  infoAbout: "articles" | "projects" | "forums";
}

const OptionalInfo: React.FC<OptionalInfoProps> = ({
  piety_target_id,
  piety_category_id,
  days,
  limit_day,
  cost,
  infoAbout,
}) => {
  const { getCategoryName } = useCategorys();
  const { getTargetName } = useTargets();

  const genSearchUrl = (base: string, qParam: string, value: number): string => {
    return encodeURI(`/${base}?${qParam}=${value}`)
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return ( 
    <div className="">
      <Link to={genSearchUrl(infoAbout, 'q[piety_target_id_in][]', piety_target_id)} onClick={stopPropagation }>
        <span data-testid="piety_target_link" className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block cursor-pointer hover:underline transition hover:shadow-lg hover:scale-105">
          {getTargetName(piety_target_id)}
        </span>
      </Link>
      <Link to={genSearchUrl(infoAbout, 'q[piety_category_id_in][]', piety_category_id)} onClick={stopPropagation}>
        <span className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block cursor-pointer hover:underline transition hover:shadow-lg hover:scale-105">
          {getCategoryName(piety_category_id)}
        </span>
      </Link>

      { days != null && (
        <span className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block">
          {days} 日間
        </span>
      )}

      
      { limit_day != null && 
        <span className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block">
          { new Date(limit_day.slice(0,10)).toLocaleDateString() }</span>
      }
      
      { cost != null && (
        <Link to={genSearchUrl(infoAbout, 'cost_lteq', cost)} onClick={stopPropagation}>
          <span className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block cursor-pointer hover:underline transition hover:shadow-lg hover:scale-105">
            ¥{cost}
          </span>
        </Link>
      )}
    </div>
   );
}
 
export default OptionalInfo;