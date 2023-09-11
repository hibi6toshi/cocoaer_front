import React from "react";
import { render, screen } from "@testing-library/react";
import OptionalInfo from "../../../components/OptionalInfos/OptionalInfo";
import { BrowserRouter } from "react-router-dom";

// モックデータ
jest.mock("../../../hooks/useCategorys", () => ({
  __esModule: true,
  default: () => ({
    getCategoryName: (id) => {
      if (id === 1) return "Category 1";
      if (id === 2) return "Category 2";
      return "";
    },
  }),
}));

jest.mock("../../../hooks/useTargets", () => ({
  __esModule: true,
  default: () => ({
    getTargetName: (id) => {
      if (id === 1) return "Target 1";
      if (id === 2) return "Target 2";
      return "";
    },
  }),
}));

describe("OptionalInfo", () => {
  it("renders optional info correctly", () => {
    const props = {
      piety_target_id: 1,
      piety_category_id: 2,
      days: 7,
      limit_day: "2023-07-11",
      cost: 100,
      infoAbout: "articles"
    };

    const { getByText } = render(
      <BrowserRouter>
        <OptionalInfo {...props} />
      </BrowserRouter>
    );

    expect(getByText("Target 1")).toBeInTheDocument();
    expect(getByText("Category 2")).toBeInTheDocument();
    expect(getByText("7 日間")).toBeInTheDocument();
    expect(getByText("2023/7/11")).toBeInTheDocument();
    expect(getByText("¥100")).toBeInTheDocument();
  });

  it("renders optional info without optional values", () => {
    const props = {
      piety_target_id: 1,
      piety_category_id: 2,
      infoAbout: "articles"
    };

    const { getByText, queryByText } = render(
      <BrowserRouter>
        <OptionalInfo {...props} />
      </BrowserRouter>
    );

    expect(getByText("Target 1")).toBeInTheDocument();
    expect(getByText("Category 2")).toBeInTheDocument();
    expect(queryByText("7 日間")).toBeNull();
    expect(queryByText("2023/07/11")).toBeNull();
    expect(queryByText("¥100")).toBeNull();
  });

  it ("has search link", () => {
    const props = {
      piety_target_id: 1,
      piety_category_id: 2,
      cost: 100,
      infoAbout: "articles"
    };

    render(
      <BrowserRouter>
        <OptionalInfo {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText("Target 1").closest('a')).toHaveAttribute('href', '/articles?q%5Bpiety_target_id_in%5D%5B%5D=1')
    expect(screen.getByText("Category 2").closest('a')).toHaveAttribute('href', '/articles?q%5Bpiety_category_id_in%5D%5B%5D=2')
    expect(screen.getByText("¥100").closest('a')).toHaveAttribute('href', '/articles?cost_lteq=100')
  });
});
