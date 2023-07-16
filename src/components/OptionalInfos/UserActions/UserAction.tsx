import IconButton, { IconButtonProps } from "../../Elements/IconButton";

interface UserActionProps {
  iconButtonArray: IconButtonProps[]
}

const UserAction: React.FC<UserActionProps> = ({
  iconButtonArray
}) => {
  return (
    <>
      {iconButtonArray.map((iBprop, index) => (
        (
          <span className="mx-1" key={index}>
            <IconButton
              icon={iBprop.icon}
              onClickIcon={iBprop.onClickIcon}
              key={index}
            />
          </span>
        )
      ))}
    </>
  );
}
export default UserAction;