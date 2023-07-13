import { render, fireEvent, screen } from '@testing-library/react';
import ForumForm from '../../../features/forums/ForumForm';
import { BrowserRouter } from 'react-router-dom';

const forum = {
  title: 'Test Title',
  body: 'Test Body',
  piety_category_id: '1',
  piety_target_id: '2',
  days: '3',
  cost: '4000',
  warningTitle: null,
  warningBody: null,
};

jest.mock("../../../hooks/useCategorys", () => ({
  __esModule: true,
  default: () => ({
    getPietyCategorysDict: () => [
      { value: '1', label: 'Category 1' },
      { value: '2', label: 'Category 2' },
    ],
  }),
}));

jest.mock("../../../hooks/useTargets", () => ({
  __esModule: true,
  default: () => ({
    getPietyTargetsDict: () => [
      { value: '1', label: 'Target 1' },
      { value: '2', label: 'Target 2' },
    ],
  }),
}));

describe('ForumForm', () => {
  it('renders the forum form with initial values', () => {
    render(
      <BrowserRouter>
        <ForumForm forum={forum} dispatch={jest.fn()} submitAction={jest.fn()} isSending={false} />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    const categorySelect = screen.getByLabelText('カテゴリ');
    const targetSelect = screen.getByLabelText('ターゲット');
    const daysInput = screen.getByLabelText('日数');
    const costInput = screen.getByLabelText('費用');

    expect(titleInput.value).toBe('Test Title');
    expect(bodyTextarea.value).toBe('Test Body');
    // expect(categorySelect.value).toBe('1');
    // expect(targetSelect.value).toBe('2');
    expect(daysInput.value).toBe('3');
    expect(costInput.value).toBe('4000');
  });

  it('updates the form state when inputs change', () => {
    const dispatchMock = jest.fn();

    render(
      <BrowserRouter>
        <ForumForm forum={forum} dispatch={dispatchMock} submitAction={jest.fn()} isSending={false} />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    const daysInput = screen.getByLabelText('日数');
    const costInput = screen.getByLabelText('費用');

    fireEvent.change(titleInput, { target: { value: 'A' } });
    fireEvent.change(bodyTextarea, { target: { value: 'B' } });
    fireEvent.change(daysInput, { target: { value: '4' } });
    fireEvent.change(costInput, { target: { value: '5' } });

    expect(dispatchMock).toHaveBeenCalledTimes(6);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, { title: 'A' });
    expect(dispatchMock).toHaveBeenNthCalledWith(2, { warningTitle: null});
    expect(dispatchMock).toHaveBeenNthCalledWith(3, { body: "B" });
    expect(dispatchMock).toHaveBeenNthCalledWith(4, { warningBody: null, });
    expect(dispatchMock).toHaveBeenNthCalledWith(5, { days: '4' });
    expect(dispatchMock).toHaveBeenNthCalledWith(6, { cost: '5' });
  });

  it('updates with invalid input values', () => {
    const dispatchMock = jest.fn();

    render(
      <BrowserRouter>
        <ForumForm forum={forum} dispatch={dispatchMock} submitAction={jest.fn()} isSending={false} />
      </BrowserRouter> 
    );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    const daysInput = screen.getByLabelText('日数');
    const costInput = screen.getByLabelText('費用');

    fireEvent.change(titleInput, { target: { value: 'A' } });
    fireEvent.change(bodyTextarea, { target: { value: 'B' } });
    fireEvent.change(daysInput, { target: { value: '-4' } });
    fireEvent.change(costInput, { target: { value: '-5' } });

    expect(dispatchMock).toHaveBeenCalledTimes(6);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, { title: 'A' });
    expect(dispatchMock).toHaveBeenNthCalledWith(2, { warningTitle: null});
    expect(dispatchMock).toHaveBeenNthCalledWith(3, { body: 'B' });
    expect(dispatchMock).toHaveBeenNthCalledWith(4, { warningBody: null, });
    expect(dispatchMock).toHaveBeenNthCalledWith(5, { days: '4' });
    expect(dispatchMock).toHaveBeenNthCalledWith(6, { cost: '5' });
  });

  it('submits the form when the submit button is clicked', () => {
    const submitActionMock = jest.fn();
    render(
      <BrowserRouter>
        <ForumForm forum={forum} dispatch={jest.fn()} submitAction={submitActionMock} isSending={false} />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('送信');
    fireEvent.click(submitButton);

    expect(submitActionMock).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button while submitting the form', () => {
    render(
      <BrowserRouter>
        <ForumForm forum={forum} dispatch={jest.fn()} submitAction={jest.fn()} isSending={true} />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('送信');
    expect(submitButton).toBeDisabled();
  });
});
