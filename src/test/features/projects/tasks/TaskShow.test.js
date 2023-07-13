import { render, screen, fireEvent } from '@testing-library/react';
import TaskShow from '../../../../features/projects/tasks/TaskShow';
import IconButton from '../../../../components/Elements/IconButton';

const task = {
  id: '1',
  user_id: '1',
  project_id: '1',
  name: 'Task 1',
};

describe('TaskShow', () => {
  it('renders the task name when not in edit mode', () => {
    render(<TaskShow task={task} />);

    const taskName = screen.getByText('Task 1');
    expect(taskName).toBeInTheDocument();
  });

  it('renders the task input when in edit mode', () => {
    render(<TaskShow task={task} editAction={jest.fn()} />);

    const taskInput = screen.getByRole('textbox');
    expect(taskInput).toBeInTheDocument();
    expect(taskInput.value).toBe('Task 1');
  });

  it('calls the editAction callback when the task input changes', () => {
    const editActionMock = jest.fn();
    render(<TaskShow task={task} editAction={editActionMock} />);

    const taskInput = screen.getByRole('textbox');
    fireEvent.change(taskInput, { target: { value: 'Updated Task' } });

    expect(editActionMock).toHaveBeenCalledTimes(1);
    expect(editActionMock).toHaveBeenCalledWith('Updated Task');
  });

  it('calls the onBlurTask callback when the task input loses focus', () => {
    const onBlurTaskMock = jest.fn();
    const editActionMock = jest.fn();
    render(<TaskShow task={task} editAction={editActionMock} onBlurAction={onBlurTaskMock} />);

    const taskInput = screen.getByRole('textbox');
    fireEvent.blur(taskInput);

    expect(onBlurTaskMock).toHaveBeenCalledTimes(1);
  });

  it('can not calls the onBlurTask without editAction', () => {
    const onBlurTaskMock = jest.fn();
    render(<TaskShow task={task} onBlurACtion={onBlurTaskMock} />);

    const taskInput = screen.queryByRole('textbox');
    expect(onBlurTaskMock).not.toBeInTheDocument;
  });


  it('renders the icon button when provided', () => {
    const iconButton = (
      <IconButton icon={() => <div>Icon</div>} onClickIcon={jest.fn()} />
    );
    render(<TaskShow task={task} iconButton={iconButton} />);

    const iconButtonElement = screen.getByText('Icon');
    expect(iconButtonElement).toBeInTheDocument();
  });

  it('calls the onClickIcon callback when the icon button is clicked', () => {
    const onClickIconMock = jest.fn();
    const iconButton = (
      <IconButton icon={() => <div>Icon</div>} onClickIcon={onClickIconMock} />
    );
    render(<TaskShow task={task} iconButton={iconButton} />);

    const iconButtonElement = screen.getByText('Icon');
    fireEvent.click(iconButtonElement);

    expect(onClickIconMock).toHaveBeenCalledTimes(1);
  });
});
