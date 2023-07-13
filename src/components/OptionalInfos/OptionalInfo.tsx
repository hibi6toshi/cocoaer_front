import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";


interface OptionalInfoProps {
  piety_target_id: number;
  piety_category_id: number;
  days?: number;
  cost?: number;
  limit_day?: string;
}

const OptionalInfo: React.FC<OptionalInfoProps> = ({
  piety_target_id,
  piety_category_id,
  days,
  limit_day,
  cost,
}) => {
  const { getCategoryName } = useCategorys();
  const { getTargetName } = useTargets();

  return ( 
    <div className="">
      <span className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block">
        {getTargetName(piety_target_id)}
      </span>
      <span className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block">
        {getCategoryName(piety_category_id)}
      </span>

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
        <span className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3 mb-3 display: inline-block">
        ¥{cost}
        </span>
      )}
    </div>
   );
}
 
export default OptionalInfo;