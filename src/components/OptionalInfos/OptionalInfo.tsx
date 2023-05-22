interface OptionalInfoProps {
  piety_target_id: number;
  piety_category_id: number;
  days?: number;
  cost?: number;
}

const OptionalInfo: React.FC<OptionalInfoProps> = ({
  piety_target_id,
  piety_category_id,
  days,
  cost,
}) => {
  return ( 
    <div className="
      flex
      flex-row
    ">
      <div className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3">
        target={piety_target_id}
      </div>
      <div className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3">
        category={piety_category_id}
      </div>
      <div className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3">
        { days != null && (
          `${days} days`
        )}
      </div>
      <div className="rounded-full bg-gray-500 bg-opacity-20 p-1 px-2 mr-3">
        { cost != null && (
          `${cost} yen`
        )}
      </div>
    </div>
   );
}
 
export default OptionalInfo;