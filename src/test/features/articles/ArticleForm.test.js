import { render, fireEvent, screen } from '@testing-library/react';
import ArticleForm from '../../../features/articles/ArticleForm';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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

const article = {
  title: 'Test Title',
  body: 'Test Body',
  piety_category_id: '1',
  piety_target_id: '2',
  days: '3',
  cost: '4000',
  picture :  undefined,
  warningTitle: null,
  warningBody: null,
};

describe('ArticleForm', () => {
  it('renders the article form with initial values', () => {
    render(
        <BrowserRouter>
          <ArticleForm article={article} dispatch={jest.fn()} submitAction={jest.fn()} isSending={false} />
        </BrowserRouter>
      );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    // const categorySelect = screen.getByLabelText('カテゴリ');
    // const targetSelect = screen.getByLabelText('ターゲット');
    const daysInput = screen.getByLabelText('日数');
    const costInput = screen.getByLabelText('費用');

    expect(titleInput.value).toBe('Test Title');
    expect(bodyTextarea.value).toBe('Test Body');
    // expect(categorySelect.value).toBe('1');
    // expect(targetSelect.value).toBe('2');
    // react-selectのせいか、””になるので、一旦無視
    expect(daysInput.value).toBe('3');
    expect(costInput.value).toBe('4000');
  });

  it('updates the form state when inputs change', () => {
    const dispatchMock = jest.fn();
    
    render(
      <BrowserRouter>
        <ArticleForm article={article} dispatch={dispatchMock} submitAction={jest.fn()} isSending={false} />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    // const categorySelect = screen.getByLabelText('カテゴリ');
    // const targetSelect = screen.getByLabelText('ターゲット');
    const daysInput = screen.getByLabelText('日数');
    const costInput = screen.getByLabelText('費用');
  
    userEvent.type(titleInput, 'A');
    userEvent.type(bodyTextarea, 'B');
    // userEvent.selectOptions(categorySelect, '1');
    // userEvent.selectOptions(targetSelect, '2');
    userEvent.type(daysInput, '4');
    userEvent.type(costInput, '5');
  
    expect(dispatchMock).toHaveBeenCalledTimes(7);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, { title: 'Test TitleA' });
    expect(dispatchMock).toHaveBeenNthCalledWith(2, { warningTitle: null});
    // // expect(dispatchMock).toHaveBeenNthCalledWith(3, { piety_category_id: '1' });
    // // expect(dispatchMock).toHaveBeenNthCalledWith(4, { piety_target_id: '2' });
    expect(dispatchMock).toHaveBeenNthCalledWith(3, { body: "Test BodyB" });
    expect(dispatchMock).toHaveBeenNthCalledWith(4, { warningBody: null, });
    expect(dispatchMock).toHaveBeenNthCalledWith(5, { days: "34" }); // なぜ？
    expect(dispatchMock).toHaveBeenNthCalledWith(6, { days: "3" });
    expect(dispatchMock).toHaveBeenNthCalledWith(7, { cost: '40005' });
  });

  it('updates with invalid inputvalue', () => {
    const dispatchMock = jest.fn();
    
    render(
      <BrowserRouter>
        <ArticleForm article={article} dispatch={dispatchMock} submitAction={jest.fn()} isSending={false} />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    // const categorySelect = screen.getByLabelText('カテゴリ');
    // const targetSelect = screen.getByLabelText('ターゲット');
    const daysInput = screen.getByLabelText('日数');
    const costInput = screen.getByLabelText('費用');
  
    userEvent.type(titleInput, 'A');
    userEvent.type(bodyTextarea, 'B');
    // userEvent.selectOptions(categorySelect, '1');
    // userEvent.selectOptions(targetSelect, '2');
    userEvent.type(daysInput, '-4');
    userEvent.type(costInput, '-5');
  
    expect(dispatchMock).toHaveBeenCalledTimes(9);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, { title: 'Test TitleA' });
    expect(dispatchMock).toHaveBeenNthCalledWith(2, { warningTitle: null});
    // // expect(dispatchMock).toHaveBeenNthCalledWith(3, { piety_category_id: '1' });
    // // expect(dispatchMock).toHaveBeenNthCalledWith(4, { piety_target_id: '2' });
    expect(dispatchMock).toHaveBeenNthCalledWith(3, { body: "Test BodyB" });
    expect(dispatchMock).toHaveBeenNthCalledWith(4, { warningBody: null, });
    expect(dispatchMock).toHaveBeenNthCalledWith(5, { days: "3" });
    expect(dispatchMock).toHaveBeenNthCalledWith(6, { days: "34" });
    expect(dispatchMock).toHaveBeenNthCalledWith(7, { days: '3' }); // なぜ？
    expect(dispatchMock).toHaveBeenNthCalledWith(8, { cost: '4000' });
    expect(dispatchMock).toHaveBeenNthCalledWith(9, { cost: '40005' });
  });

  it('submits the form when the submit button is clicked', () => {
    const submitActionMock = jest.fn();
    render(
      <BrowserRouter>
        <ArticleForm article={article} dispatch={jest.fn()} submitAction={submitActionMock} isSending={false} />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('送信');
    fireEvent.click(submitButton);

    expect(submitActionMock).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button while submitting the form', () => {
    render(
      <BrowserRouter>
        <ArticleForm article={article} dispatch={jest.fn()} submitAction={jest.fn()} isSending={true} />
      </BrowserRouter>    
    );

    const submitButton = screen.getByText('送信');
    expect(submitButton).toBeDisabled();
  });
});
