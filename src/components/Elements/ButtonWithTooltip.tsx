import Button from "./Button";
import Tooltip from "./Tooltip";

interface ButtonWithTooltipProps {
  // Button Props
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  // Tooltip Props
  text: string
  displayed?: boolean
}

const ButtonWithTooltip: React.FC<ButtonWithTooltipProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  text,
  displayed,
}) => {
  return ( 
    <div className="w-full">
      <Tooltip
        text={text}
        displayed={displayed}
      >
        <Button 
          label={label}
          onClick={onClick}
          disabled={disabled}
          outline={outline}
          small={small}
        />
      </Tooltip>
    </div>
   );
}
 
export default ButtonWithTooltip;