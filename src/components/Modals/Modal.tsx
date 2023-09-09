import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string
  body?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  disabled,
}) => {

  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = useCallback( () => {
    // ダブルクリック防止？
    if (disabled){
      return;
    }

    setShowModal(false);
    setTimeout(()=>{
      onClose();
    }, 300);
  }, [disabled, onClose]);

  if(!isOpen){
    return null;
  }

  return (
    <>  
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
          "
        >
          {/* {content} */}
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div
              className="
                translate
                h-full
                md:h-auto
                lg:h-auto
                border-0 
                rounded-lg 
                shadow-lg 
                relative 
                flex 
                flex-col 
                w-full 
                bg-white 
                outline-none 
                focus:outline-none
              "
            >
              <div
                className="
                  flex
                  items-center
                  p-6
                  rounded-t
                  justify-center
                  relative
                  border-b-[1px]
                "
              >
                <div className="text-lg font-semibold">
                  {title}
                </div>
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                {body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Modal;