import React from "react";
import { render } from "@testing-library/react";
import OptionalInfo from "../../../components/OptionalInfos/OptionalInfo";

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
    };

    const { getByText } = render(<OptionalInfo {...props} />);

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
    };

    const { getByText, queryByText } = render(<OptionalInfo {...props} />);

    expect(getByText("Target 1")).toBeInTheDocument();
    expect(getByText("Category 2")).toBeInTheDocument();
    expect(queryByText("7 日間")).toBeNull();
    expect(queryByText("2023/07/11")).toBeNull();
    expect(queryByText("¥100")).toBeNull();
  });
});




// import { render } from "@testing-library/react";
// import OptionalInfo from "../../../components/OptionalInfos/OptionalInfo";

// const mockGetCategoryName = jest.fn();
// const mockGetTargetName = jest.fn();

// jest.mock("../../../hooks/useCategorys", () => ({
//   __esModule: true,
//   default: () => ({
//     getCategoryName: mockGetCategoryName,
//   }),
// }));

// jest.mock("../../../hooks/useTargets", () => ({
//   __esModule: true,
//   default: () => ({
//     getTargetName: mockGetTargetName,
//   }),
// }));

// describe("OptionalInfo component", () => {
//   const pietyTargetDict = {
//     1: "Target 1",
//     2: "Target 2",
//   };

//   const pietyCategoryDict = {
//     1: "Category 1",
//     2: "Category 2",
//   };

//   beforeEach(() => {
//     mockGetCategoryName.mockClear();
//     mockGetTargetName.mockClear();
//   });

//   test("renders with optional props", () => {
//     mockGetCategoryName.mockReturnValue("Category 1");
//     mockGetTargetName.mockReturnValue("Target 1");

//     const { getByText } = render(
//       <OptionalInfo
//         piety_target_id={1}
//         piety_category_id={1}
//         days={5}
//         limit_day="2023-07-11"
//         cost={1000}
//       />
//     );

//     expect(getByText("Target 1")).toBeInTheDocument();
//     expect(getByText("Category 1")).toBeInTheDocument();
//     expect(getByText("5 日間")).toBeInTheDocument();
//     expect(getByText("2023/7/11")).toBeInTheDocument();
//     expect(getByText("¥1000")).toBeInTheDocument();

//     expect(mockGetCategoryName).toHaveBeenCalledWith(1);
//     expect(mockGetTargetName).toHaveBeenCalledWith(1);
//   });

//   test("renders without optional props", () => {
//     mockGetCategoryName.mockReturnValue("Category 2");
//     mockGetTargetName.mockReturnValue("Target 2");

//     const { getByText, queryByText } = render(
//       <OptionalInfo piety_target_id={2} piety_category_id={2} />
//     );

//     expect(getByText("Target 2")).toBeInTheDocument();
//     expect(getByText("Category 2")).toBeInTheDocument();
//     expect(queryByText("5 日間")).not.toBeInTheDocument();
//     expect(queryByText("2023/07/11")).not.toBeInTheDocument();
//     expect(queryByText("¥1000")).not.toBeInTheDocument();

//     expect(mockGetCategoryName).toHaveBeenCalledWith(2);
//     expect(mockGetTargetName).toHaveBeenCalledWith(2);
//   });
// });

// import { render, screen } from "@testing-library/react";
// import OptionalInfo from "../../../components/OptionalInfos/OptionalInfo";

// jest.mock("../../../providers/PietyCategoryProvider", () => ({
//   usePietyCategoryContext: jest.fn(() => ({
//     getCategoryName: jest.fn((id) => {
//       return {
//         1: "Category 1",
//         2: "Category 2",
//       }[id];
//     }),
//     getPietyCategoryDict: jest.fn(() => {
//       return [
//         { value: 1, label: "Category 1" },
//         { value: 2, label: "Category 2" },
//       ];
//     }),
//   })),
// }));

// jest.mock("../../../providers/PietyTargetProvider", () => ({
//   usePietyTargetContext: jest.fn(() => ({
//     getTargetName: jest.fn((id) => {
//       return {
//         1: "Target 1",
//         2: "Target 2",
//       }[id];
//     }),
//     getPietyTargetsDict: jest.fn(() => {
//       return [
//         { value: 1, label: "Target 1" },
//         { value: 2, label: "Target 2" },
//       ];
//     }),
//   })),
// }));


// describe("OptionalInfo", () => {
//   test("renders optional info correctly", () => {
//     const props = {
//       piety_target_id: 1,
//       piety_category_id: 2,
//       days: 5,
//       limit_day: "2023-07-11T00:00:00",
//       cost: 100,
//     };

//     const { getByText } = render(<OptionalInfo {...props} />);

//     expect(getByText("Target 1")).toBeInTheDocument();
//     expect(getByText("Category 2")).toBeInTheDocument();
//     expect(getByText("5 日間")).toBeInTheDocument();
//     expect(getByText("2023-07-11")).toBeInTheDocument();
//     expect(getByText("¥100")).toBeInTheDocument();
//   });
// });
// describe("Rendering", ()=>{
//   test('各パラメータ表示', () => {
//     render(<OptionalInfo
//       piety_target_id={1}
//       piety_category_id={2}
//       days={3}
//       cost={4}
//     />)
//     const piety_target = screen.getByText("target=1");
//     expect(piety_target).toBeInTheDocument();
//     const piety_category = screen.getByText("category=2");
//     expect(piety_category).toBeInTheDocument();
//     const days = screen.getByText("3 days");
//     expect(days).toBeInTheDocument();
//     const cost = screen.getByText("4 yen");
//     expect(cost).toBeInTheDocument();
//   });

//   test('任意項目がnullの時の表示', () => {
//     render(<OptionalInfo 
//       piety_target_id={1}
//       piety_category_id={2}
//       days={ null }
//       cost={ null }
//     />)
//     const piety_target = screen.getByText("target=1");
//     expect(piety_target).toBeInTheDocument();
//     const piety_category = screen.getByText("category=2");
//     expect(piety_category).toBeInTheDocument();
//     const days = screen.queryByText("days");
//     expect(days).toBeNull();
//     const cost = screen.queryByText("yen");
//     expect(cost).toBeNull();
//   });
// });
