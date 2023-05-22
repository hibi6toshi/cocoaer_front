import { render, screen } from "@testing-library/react";
import OptionalInfo from "../../../components/OptionalInfos/OptionalInfo";

describe("Rendering", ()=>{
  test('各パラメータ表示', () => {
    render(<OptionalInfo
      piety_target_id={1}
      piety_category_id={2}
      days={3}
      cost={4}
    />)
    const piety_target = screen.getByText("target=1");
    expect(piety_target).toBeInTheDocument();
    const piety_category = screen.getByText("category=2");
    expect(piety_category).toBeInTheDocument();
    const days = screen.getByText("3 days");
    expect(days).toBeInTheDocument();
    const cost = screen.getByText("4 yen");
    expect(cost).toBeInTheDocument();
  });

  test('任意項目がnullの時の表示', () => {
    render(<OptionalInfo 
      piety_target_id={1}
      piety_category_id={2}
      days={ null }
      cost={ null }
    />)
    const piety_target = screen.getByText("target=1");
    expect(piety_target).toBeInTheDocument();
    const piety_category = screen.getByText("category=2");
    expect(piety_category).toBeInTheDocument();
    const days = screen.queryByText("days");
    expect(days).toBeNull();
    const cost = screen.queryByText("yen");
    expect(cost).toBeNull();
  });
});
