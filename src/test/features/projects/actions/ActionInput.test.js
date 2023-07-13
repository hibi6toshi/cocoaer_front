import { render, screen, fireEvent } from '@testing-library/react';
import ActionInput from '../../../../features/projects/actions/ActionInput';

const actions = [
  { id: '1', user_id: '1', project_id: '1', name: 'Action 1' },
  { id: '2', user_id: '1', project_id: '1', name: 'Action 2' },
];

describe('ActionInput', () => {
  it('renders the action input with initial actions', () => {
    render(<ActionInput actions={actions} dispatch={jest.fn()} />);

    const actionInputs = screen.getAllByRole('textbox');
    expect(actionInputs).toHaveLength(3);
    expect(actionInputs[0].value).toBe('Action 1');
    expect(actionInputs[1].value).toBe('Action 2');
  });

  it('adds a new action when the add button is clicked', () => {
    const dispatchMock = jest.fn();
    render(<ActionInput actions={actions} dispatch={dispatchMock} />);

    const addActionInput = screen.getAllByRole('textbox')[2];
    const addButton = screen.getByText('追加');
    fireEvent.change(addActionInput, { target: { value: 'New Action' } });
    fireEvent.click(addButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith([
      { id: '1', user_id: '1', project_id: '1', name: 'Action 1' },
      { id: '2', user_id: '1', project_id: '1', name: 'Action 2' },
      { id: null, user_id: null, project_id: null, name: 'New Action' },
    ]);
  });

  it('deletes an action when the delete icon button is clicked', () => {
    const dispatchMock = jest.fn();
    render(<ActionInput actions={actions} dispatch={dispatchMock} />);

    // const deleteButton = screen.getAllByLabelText('アクションを削除');
    const deleteButton = screen.getAllByLabelText('IconButton')
    fireEvent.click(deleteButton[0]);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith([
      { id: '2', user_id: '1', project_id: '1', name: 'Action 2' },
    ]);
  });

  it('updates an action name when the action input changes', () => {
    const dispatchMock = jest.fn();
    render(<ActionInput actions={actions} dispatch={dispatchMock} />);

    const actionInputs = screen.getAllByRole('textbox');
    fireEvent.change(actionInputs[0], { target: { value: 'Updated Action' } });
    
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith([
      { id: '1', user_id: '1', project_id: '1', name: 'Updated Action' },
      { id: '2', user_id: '1', project_id: '1', name: 'Action 2' },
    ]);
  });
});
