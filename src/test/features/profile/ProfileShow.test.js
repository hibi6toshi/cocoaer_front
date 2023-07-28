import { render, fireEvent } from "@testing-library/react";
import ProfileForm from "../../../features/profile/ProfileForm";


describe("ProfileForm", () => {
  it("renders the form correctly", () => {
    const profile = {
      name: "John Doe",
      avatar: {
        url: "https://example.com/avatar.jpg",
      },
      introduction: "Hello, I'm John!",
      warningName: null,
    };

    const isSending = false;
    const dispatch = jest.fn();
    const submitAction = jest.fn();
    const cancelAction = jest.fn();

    const { getByLabelText, getByText, getByAltText } = render(
      <ProfileForm
        profile={profile}
        isSending={isSending}
        dispatch={dispatch}
        submitAction={submitAction}
        cancelAction={cancelAction}
      />
    );

    const userNameInput = getByLabelText("profileName");
    const userIntroductionTextarea = getByLabelText("profileIntroduction");
    const submitButton = getByText("送信");
    const cancelButton = getByText("キャンセル");
    const userAvatarElement = getByAltText("profileAvatar");

    expect(userNameInput).toBeInTheDocument();
    expect(userIntroductionTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(userAvatarElement).toBeInTheDocument();
  });

  it("calls the submitAction function when form is submitted", () => {
    const profile = {
      name: "Jane Doe",
      avatar: {
        url: null,
      },
      introduction: "",
      warningName: null,
    };

    const isSending = false;
    const dispatch = jest.fn();
    const submitAction = jest.fn();
    const cancelAction = jest.fn();

    const { getByLabelText, getByText } = render(
      <ProfileForm
        profile={profile}
        isSending={isSending}
        dispatch={dispatch}
        submitAction={submitAction}
        cancelAction={cancelAction}
      />
    );

    const userNameInput = getByLabelText("profileName");
    const userIntroductionTextarea = getByLabelText("profileIntroduction");
    const submitButton = getByText("送信");

    fireEvent.change(userNameInput, { target: { value: "Jane Smith" } });
    fireEvent.change(userIntroductionTextarea, { target: { value: "Hello!" } });
    fireEvent.click(submitButton);

    expect(submitAction).toHaveBeenCalled();
  });

  it("calls the cancelAction function when cancel button is clicked", () => {
    const profile = {
      name: "John Smith",
      avatar: {
        url: null,
      },
      introduction: "",
      warningName: null,
    };

    const isSending = false;
    const dispatch = jest.fn();
    const submitAction = jest.fn();
    const cancelAction = jest.fn();

    const { getByText } = render(
      <ProfileForm
        profile={profile}
        isSending={isSending}
        dispatch={dispatch}
        submitAction={submitAction}
        cancelAction={cancelAction}
      />
    );

    const cancelButton = getByText("キャンセル");
    fireEvent.click(cancelButton);

    expect(cancelAction).toHaveBeenCalled();
  });
});
