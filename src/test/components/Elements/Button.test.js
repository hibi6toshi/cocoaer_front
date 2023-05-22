import { render, screen } from "@testing-library/react";
import Button from "../../../components/Elements/Button";
import userEvent from "@testing-library/user-event";

describe("Rendering", ()=>{
  test('Label表示', () => {
    render(<Button 
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
    render(<Button 
      label={"onClick"}
      onClick={onClickFunc}
    />)
    userEvent.click(screen.getByRole("button"))
    expect(onClickFunc).toHaveBeenCalled();
  });

  test('disable属性指定時にonClickが発火しないこと', () => {
    const onClickFunc = jest.fn();
    render(<Button 
      label={"onClick"}
      onClick={onClickFunc}
      disabled={true}
    />)
  const label = screen.getByRole("button");
  expect(label).toBeDisabled();
  });
});
