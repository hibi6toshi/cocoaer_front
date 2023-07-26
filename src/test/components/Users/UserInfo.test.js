import { render } from "@testing-library/react";
import UserInfoHeader from "../../../components/Users/UserInfo";

describe("UserInfoHeader", () => {
  it("renders user information correctly", () => {
    const user = {
      name: "John Doe",
      avatar: {
        url: "https://example.com/avatar.jpg",
      },
      introduction: "Hello, I'm John!",
    };

    const { getByText, getByAltText } = render(<UserInfoHeader user={user} />);

    const userNameElement = getByText("John Doe");
    const userIntroductionElement = getByText("Hello, I'm John!");
    const userAvatarElement = getByAltText("userIcon");

    expect(userNameElement).toBeInTheDocument();
    expect(userIntroductionElement).toBeInTheDocument();
    expect(userAvatarElement).toBeInTheDocument();
    expect(userAvatarElement).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("displays 'no introduction' when introduction is not available", () => {
    const user = {
      name: "Jane Doe",
      avatar: {
        url: "https://example.com/avatar.jpg",
      },
      introduction: undefined,
    };

    const { getByText } = render(<UserInfoHeader user={user} />);

    const userIntroductionElement = getByText("no introduction");

    expect(userIntroductionElement).toBeInTheDocument();
  });
});
