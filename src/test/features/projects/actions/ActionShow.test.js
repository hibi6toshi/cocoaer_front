import { render, screen, fireEvent } from '@testing-library/react';
import ActionShow from '../../../../features/projects/actions/ActionShow';
import IconButton from '../../../../components/Elements/IconButton';

const action = {
  id: '1',
  user_id: '1',
  project_id: '1',
  name: 'Action 1',
};

describe('ActionShow', () => {
  it('renders the action name when not in edit mode', () => {
    render(<ActionShow action={action} />);

    const actionName = screen.getByText('Action 1');
    expect(actionName).toBeInTheDocument();
  });

  it('renders the action input when in edit mode', () => {
    render(<ActionShow action={action} editAction={jest.fn()} />);

    const actionInput = screen.getByRole('textbox');
    expect(actionInput).toBeInTheDocument();
    expect(actionInput.value).toBe('Action 1');
  });

  it('calls the editAction callback when the action input changes', () => {
    const editActionMock = jest.fn();
    render(<ActionShow action={action} editAction={editActionMock} />);

    const actionInput = screen.getByRole('textbox');
    fireEvent.change(actionInput, { target: { value: 'Updated Action' } });

    expect(editActionMock).toHaveBeenCalledTimes(1);
    expect(editActionMock).toHaveBeenCalledWith('Updated Action');
  });

  it('calls the onBlurAction callback when the action input loses focus', () => {
    const onBlurActionMock = jest.fn();
    const editActionMock = jest.fn();
    render(<ActionShow action={action} editAction={editActionMock} onBlurAction={onBlurActionMock} />);

    const actionInput = screen.getByRole('textbox');
    fireEvent.blur(actionInput);

    expect(onBlurActionMock).toHaveBeenCalledTimes(1);
  });

  it('can not calls the onBlurAction without editAction', () => {
    const onBlurActionMock = jest.fn();
    render(<ActionShow action={action} onBlurAction={onBlurActionMock} />);

    const actionInput = screen.queryByRole('textbox');
    expect(onBlurActionMock).not.toBeInTheDocument;
  });


  it('renders the icon button when provided', () => {
    const iconButton = (
      <IconButton icon={() => <div>Icon</div>} onClickIcon={jest.fn()} />
    );
    render(<ActionShow action={action} iconButton={iconButton} />);

    const iconButtonElement = screen.getByText('Icon');
    expect(iconButtonElement).toBeInTheDocument();
  });

  it('calls the onClickIcon callback when the icon button is clicked', () => {
    const onClickIconMock = jest.fn();
    const iconButton = (
      <IconButton icon={() => <div>Icon</div>} onClickIcon={onClickIconMock} />
    );
    render(<ActionShow action={action} iconButton={iconButton} />);

    const iconButtonElement = screen.getByText('Icon');
    fireEvent.click(iconButtonElement);

    expect(onClickIconMock).toHaveBeenCalledTimes(1);
  });
});
