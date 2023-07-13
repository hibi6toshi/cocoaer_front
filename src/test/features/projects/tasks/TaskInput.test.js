import { render, screen, fireEvent } from '@testing-library/react';
import TaskInput from '../../../../features/projects/tasks/TaskInput';

const tasks = [
  { id: '1', user_id: '1', project_id: '1', name: 'Task 1' },
  { id: '2', user_id: '1', project_id: '1', name: 'Task 2' },
];

describe('TaskInput', () => {
  it('renders the task input with initial tasks', () => {
    render(<TaskInput tasks={tasks} dispatch={jest.fn()} />);

    const taskInputs = screen.getAllByRole('textbox');
    expect(taskInputs).toHaveLength(3);
    expect(taskInputs[0].value).toBe('Task 1');
    expect(taskInputs[1].value).toBe('Task 2');
  });

  it('adds a new task when the add button is clicked', () => {
    const dispatchMock = jest.fn();
    render(<TaskInput tasks={tasks} dispatch={dispatchMock} />);

    const addTaskInput = screen.getAllByRole('textbox')[2];
    const addButton = screen.getByText('追加');
    fireEvent.change(addTaskInput, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith([
      { id: '1', user_id: '1', project_id: '1', name: 'Task 1' },
      { id: '2', user_id: '1', project_id: '1', name: 'Task 2' },
      { id: null, user_id: null, project_id: null, name: 'New Task' },
    ]);
  });

  it('deletes an task when the delete icon button is clicked', () => {
    const dispatchMock = jest.fn();
    render(<TaskInput tasks={tasks} dispatch={dispatchMock} />);

    // const deleteButton = screen.getAllByLabelText('アクションを削除');
    const deleteButton = screen.getAllByLabelText('IconButton')
    fireEvent.click(deleteButton[0]);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith([
      { id: '2', user_id: '1', project_id: '1', name: 'Task 2' },
    ]);
  });

  it('updates an task name when the task input changes', () => {
    const dispatchMock = jest.fn();
    render(<TaskInput tasks={tasks} dispatch={dispatchMock} />);

    const taskInputs = screen.getAllByRole('textbox');
    fireEvent.change(taskInputs[0], { target: { value: 'Updated Task' } });
    
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith([
      { id: '1', user_id: '1', project_id: '1', name: 'Updated Task' },
      { id: '2', user_id: '1', project_id: '1', name: 'Task 2' },
    ]);
  });
});
