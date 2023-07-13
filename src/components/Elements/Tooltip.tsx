interface TooltipProps {
  children: React.ReactNode
  text: string
  displayed?: boolean
};


const Tooltip: React.FC<TooltipProps> = ({ 
  children,
  text,
  displayed,
}) => {

  if(!displayed){
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <>
      <div className="relative group w-full">
        <span
          className="
            whitespace-nowrap
            rounded
            bg-blue-500
            px-2
            py-1
            text-white
            absolute
            -top-10
            left-1/2
            -translate-x-1/2
            before:content-['']
            before:absolute
            before:-translate-x-1/2
            before:left-1/2
            before:top-full
            before:border-4
            before:border-transparent
            before:border-t-blue-500
            opacity-0
            group-hover:opacity-100
            transition
            pointer-events-none
            duration-300
            "
        >
          {text}
        </span>
        {children}
      </div>
    </>
   );
}
 
export default Tooltip;