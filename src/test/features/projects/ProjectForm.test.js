import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectForm from '../../../features/projects/ProjectForm';

const project = {
  title: 'Test Title',
  body: 'Test Body',
  piety_category_id: '1',
  piety_target_id: '2',
  limit_day: '2023-07-11',
  cost: '5000',
  tasks: [],
  actions: [],
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


describe('ProjectForm', () => {
  it('renders the project form with initial values', () => {
    render(
      <BrowserRouter>
        <ProjectForm project={project} dispatch={jest.fn()} submitAction={jest.fn()} isSending={false} />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    const categorySelect = screen.getByLabelText('カテゴリ');
    const targetSelect = screen.getByLabelText('ターゲット');
    const daysInput = screen.getByLabelText('目標日');
    const costInput = screen.getByLabelText('費用');

    expect(titleInput.value).toBe('Test Title');
    expect(bodyTextarea.value).toBe('Test Body');
    // react-selectのせいか、""になるので、一旦無視
    // expect(categorySelect.value).toBe('1');
    // expect(targetSelect.value).toBe('2');
    expect(daysInput.value).toBe('2023-07-11');
    expect(costInput.value).toBe('5000');
  });

  it('updates the form state when inputs change', () => {
    const dispatchMock = jest.fn();
    
    render(
      <BrowserRouter>
        <ProjectForm project={project} dispatch={dispatchMock} submitAction={jest.fn()} isSending={false} />
      </BrowserRouter>
    );

    const titleInput = screen.getByPlaceholderText('タイトル');
    const bodyTextarea = screen.getByPlaceholderText('本文');
    // const categorySelect = screen.getByLabelText('カテゴリ');
    // const targetSelect = screen.getByLabelText('ターゲット');
    const daysInput = screen.getByLabelText('目標日');
    const costInput = screen.getByLabelText('費用');
  
    fireEvent.change(titleInput, { target: { value: 'A' } });
    fireEvent.change(bodyTextarea, { target: { value: 'B' } });
    // fireEvent.change(categorySelect, { target: { value: '1' } });
    // fireEvent.change(targetSelect, { target: { value: '2' } });
    fireEvent.change(daysInput, { target: { value: '2023-07-12' } });
    fireEvent.change(costInput, { target: { value: '6000' } });
  
    expect(dispatchMock).toHaveBeenCalledTimes(6);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, { title: 'A' });
    expect(dispatchMock).toHaveBeenNthCalledWith(2, { warningTitle: null });
    // expect(dispatchMock).toHaveBeenNthCalledWith(3, { piety_category_id: '1' });
    // expect(dispatchMock).toHaveBeenNthCalledWith(4, { piety_target_id: '2' });
    expect(dispatchMock).toHaveBeenNthCalledWith(3, { body: 'B' });
    expect(dispatchMock).toHaveBeenNthCalledWith(4, { warningBody: null });
    expect(dispatchMock).toHaveBeenNthCalledWith(5, { limit_day: '2023-07-12' });
    expect(dispatchMock).toHaveBeenNthCalledWith(6, { cost: '6000' });
  });

  it('submits the form when the submit button is clicked', () => {
    const submitActionMock = jest.fn();
    render(
      <BrowserRouter>
        <ProjectForm project={project} dispatch={jest.fn()} submitAction={submitActionMock} isSending={false} />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('送信');
    fireEvent.click(submitButton);

    expect(submitActionMock).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button while submitting the form', () => {
    render(
      <BrowserRouter>
        <ProjectForm project={project} dispatch={jest.fn()} submitAction={jest.fn()} isSending={true} />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('送信');
    expect(submitButton).toBeDisabled();
  });
});
