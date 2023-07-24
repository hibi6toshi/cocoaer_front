import { IconType } from "react-icons";

export interface IconButtonProps {
  icon : IconType;
  onClickIcon : (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClickIcon,
  color
}) => {
  return (
    <button
      type="button"
      onClick={onClickIcon}
      className="
        by-2
        bx-2
        rounded-lg
        hover:bg-blue-300
        hover:bg-opacity-50"
      >
      <Icon
        size={20}
        aria-label="IconButton"
        color={color}
      />
    </button>
  );
}
 
export default IconButton;