import { render, fireEvent, screen } from "@testing-library/react";
import { RiArrowRightSLine } from "react-icons/ri";
import UserAction from "../../../../components/OptionalInfos/UserActions/UserAction";

describe("UserAction", () => {
  it("renders IconButton components correctly", () => {
    const iconButtonArray = [
      {
        icon: RiArrowRightSLine,
        onClickIcon: jest.fn(),
      },
    ];

    render(
      <UserAction iconButtonArray={iconButtonArray} />
    );

    const iconButton = screen.getByRole('button');

    expect(iconButton).toBeInTheDocument();
    fireEvent.click(iconButton);
    expect(iconButtonArray[0].onClickIcon).toHaveBeenCalledTimes(1);
  });
});
