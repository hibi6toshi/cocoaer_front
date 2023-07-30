import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentForm from '../../../features/comments/CommentForm';
import userEvent from '@testing-library/user-event';

// Mocking formAction function
const mockFormAction = jest.fn(() => Promise.resolve());

const testProps = {
  formCommentBody: '',
  onChangeFormCommentBody: jest.fn(),
  isSending: false,
  formAction: mockFormAction,
};

describe('CommentForm', () => {
  it('renders textarea and button correctly', () => {
    render(<CommentForm {...testProps} />);
    
    const textarea = screen.getByPlaceholderText('新規コメント');
    const button = screen.getByRole('button', { name: '送信' });

    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('disables the button when formCommentBody is empty', () => {
    render(<CommentForm {...testProps} />);
    
    const button = screen.getByRole('button', { name: '送信' });

    expect(button).toBeDisabled();
  });

  it('enables the button when formCommentBody is not empty', () => {
    testProps.formCommentBody = 'Test comment';
    render(<CommentForm {...testProps} />);
    
    const button = screen.getByRole('button', { name: '送信' });

    expect(button).not.toBeDisabled();
  });

  it('calls onChangeFormCommentBody when textarea value changes', () => {
    render(<CommentForm {...testProps} />);
    
    const textarea = screen.getByPlaceholderText('新規コメント');
    userEvent.type(textarea, "test");
    fireEvent.change(textarea, { target: { value: 'Test comment' } });

    expect(testProps.onChangeFormCommentBody).toHaveBeenCalledTimes(4);
  });

  it('calls formAction when the button is clicked', async () => {
    render(<CommentForm {...testProps} />);
    
    const textarea = screen.getByPlaceholderText('新規コメント');
    const button = screen.getByRole('button', { name: '送信' });

    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    fireEvent.click(button);

    expect(mockFormAction).toHaveBeenCalledTimes(1);

    // You can add further expectations for the state change, loading spinners, etc., depending on the behavior of the component after formAction is called.
  });
});
