import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentCard from '../../../features/comments/CommentCard';
import { BrowserRouter } from 'react-router-dom';

// jest.mock('../../../hooks/useUser', () => ({
//   __esModule: true,
//   default: jest.fn(() => ({
//     user: {
//       id: '1',
//       name: 'John Doe',
//     },
//   })),
// }));

jest.mock("../../../hooks/useUser", () => ({
  __esModule: true,
  default: () => ({
    user: {
      id: "1",
      name: "John Doe"
    },
  }),
}));

// Mocking updateAction and deleteAction functions
const mockUpdateAction = jest.fn(() => Promise.resolve());
const mockDeleteAction = jest.fn(() => Promise.resolve());

const testComment = {
  id: '1',
  body: 'Test comment',
  user: {
    id: '1',
    name: 'John Doe',
  },
  user_id: '1',
};

const testProps = {
  comment: testComment,
  commentableOwner: {
    id: '1',
    name: 'John Doe',
  },
  updateAction: mockUpdateAction,
  deleteAction: mockDeleteAction,
};

describe('CommentCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders comment correctly', () => {
    render(
      <BrowserRouter>
        <CommentCard {...testProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(testComment.body)).toBeInTheDocument();
    expect(screen.getByText(testComment.user.name)).toBeInTheDocument();
  });

  it('displays edit button and allows comment editing', async () => {
    render(
      <BrowserRouter>
        <CommentCard {...testProps} />
      </BrowserRouter>
    );

    const editButton = screen.getAllByRole('button')[0];
    fireEvent.click(editButton);

    const textarea = screen.getByPlaceholderText('新規コメント');
    expect(textarea).toBeInTheDocument();

    const updatedComment = 'Updated test comment';
    fireEvent.change(textarea, { target: { value: updatedComment } });

    const updateButton = screen.getByRole('button', { name: '送信' });
    fireEvent.click(updateButton);

    await waitFor(() => expect(mockUpdateAction).toHaveBeenCalledWith(updatedComment));
  });

  it('displays delete button and allows comment deletion', async () => {
    render(      
      <BrowserRouter>
        <CommentCard {...testProps} />
      </BrowserRouter>
    );

    const deleteButton = screen.getAllByRole('button')[1];
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteAction).toHaveBeenCalled());
  });

  it('displays no buttons with other user', async () => {
    const otherUserTestComment = {
      id: '1',
      body: 'Test comment',
      user: {
        id: '2',
        name: 'not John Doe',
      },
      user_id: '2',
    };

    const otherUserProps = {
      comment: otherUserTestComment,
      commentableOwner: {
        id: "1",
        name: 'John Doe',
      },
      updateAction: mockUpdateAction,
      deleteAction: mockDeleteAction,
    };

    render(      
      <BrowserRouter>
        <CommentCard {...otherUserProps} />
      </BrowserRouter>
    );

    const ownerActionButtons = screen.queryAllByRole('button');
    expect(ownerActionButtons).toHaveLength(0);

  });
});
