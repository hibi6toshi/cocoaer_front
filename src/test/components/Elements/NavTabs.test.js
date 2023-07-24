import { act, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import NavTabs from "../../../components/Elements/NavTabs";
import userEvent from "@testing-library/user-event";

const navTabDatas = [
  { label: "ToTest1", navTo: "/test1" },
  { label: "ToTest2", navTo: "/test2" },
]

describe("NavTabs", () => {

  it("renders NavTabs component with correct nav items",async  () => {

    const testRouter = createMemoryRouter(
      [
        {
          path: "/test1",
          element: <div>test1</div>
        },
        {
          path: "/test2",
          element: <div>test2</div>
        },
        {
          path: "/",
          element: <NavTabs navTabDatas={navTabDatas} />
        }
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={testRouter} />);

    const test1Link = screen.getByText("ToTest1");
    act(() => {
      userEvent.click(test1Link);
    });
    await waitFor(() => {
      expect(testRouter.state.location.pathname).toEqual("/test1");
    });
    
  });

  it("renders NavTabs component with optional headerInfo", () => {
    const headerInfo = <div>Optional Header</div>;

    const testRouter = createMemoryRouter(
      [
        {
          path: "/test1",
          element: <div>test1</div>
        },
        {
          path: "/test2",
          element: <div>test2</div>
        },
        {
          path: "/",
          element: <NavTabs headerInfo={headerInfo} navTabDatas={navTabDatas} />
        }
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={testRouter} />);

    const headerElement = screen.getByText("Optional Header");
    expect(headerElement).toBeInTheDocument();
  });
});