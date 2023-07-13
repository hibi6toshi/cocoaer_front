import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from "../../../components/Elements/Tooltip";

describe("Rendering", ()=>{
  test('displa=trueでtext表示',  async () => {
    render(
      <Tooltip
        text={"testLabel"}
        displayed={true}
      >Hover me</Tooltip>
    )

    // tailwind のtooltip ではdomで操作しているわけではないのでテスト不可
    // const label = screen.queryByText("testLabel");
    // expect(label).not.toBeInTheDocument();

    const sentence = screen.getByText(/Hover me/);
    userEvent.hover(sentence);
    const tooltipText = screen.getByText("testLabel");
    expect(tooltipText).toBeInTheDocument();
  });

  test('display=falseでtext非表示',  async () => {
    render(
      <Tooltip
        text={"testLabel"}
        displayed={false}
      >Hover me</Tooltip>
    )

    const label = screen.queryByText("testLabel");
    expect(label).not.toBeInTheDocument();

    const sentence = screen.getByText(/Hover me/);
    userEvent.hover(sentence);
    const tooltipText = screen.queryByText("testLabel");
    expect(tooltipText).not.toBeInTheDocument();
  });
});