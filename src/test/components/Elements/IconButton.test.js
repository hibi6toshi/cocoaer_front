import { render, screen } from '@testing-library/react';
import { RiCloseCircleFill } from 'react-icons/ri';
import IconButton from '../../../components/Elements/IconButton';
import userEvent from "@testing-library/user-event";

describe('IconButton', () => {
  it('renders the icon button with the provided icon', () => {
    render(
      <IconButton icon={RiCloseCircleFill} onClickIcon={() => {}} />
    );

    const iconElement = screen.getByLabelText('IconButton');
    expect(iconElement).toBeInTheDocument();
  });

  it('calls the onClickIcon callback when the button is clicked', () => {
    const handleClick = jest.fn();
    render(
      <IconButton icon={RiCloseCircleFill} onClickIcon={handleClick} />
    );

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
