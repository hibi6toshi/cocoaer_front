import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MenuItem from "../../../components/Elements/MenuItem";

describe("Rendering", ()=>{
  test('Label表示', () => {
    render(<MenuItem 
      label={"testLabel"}
      onClick={()=>{}}
    />)
    const label = screen.getByText("testLabel");
    expect(label).toBeInTheDocument();
  });
});

describe("Event", ()=>{
  test('onClickイベント', () => {
    const onClickFunc = jest.fn();
    render(<MenuItem  
      label={"onClick"}
      onClick={onClickFunc}
    />)
    userEvent.click(screen.getByText("onClick"));
    expect(onClickFunc).toHaveBeenCalled();
  });
});
