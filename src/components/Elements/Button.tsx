interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  rounded_full?: boolean;
}

const Button:React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  rounded_full,
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-yellow-800 bg-opacity-75'}
        ${outline ? 'border-gray-400' : 'border-yellow-800 border-opacity-75'}
        ${outline ? 'text-gray-700' : 'text-white'}
        ${small ? 'py-2' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        ${rounded_full ?  "rounded-full" : "rounded-lg"}
      `}
    >
      {label}
    </button> 
  );
}
 
export default Button;