import { render, screen } from '@testing-library/react';
import ForumInfo from '../../../features/forums/ForumInfo';
import { BrowserRouter } from 'react-router-dom';


const forum = {
  id: '1',
  user_id: '1',
  piety_target_id: 1,
  piety_category_id: 2,
  days: 3,
  cost: 4000,
  title: 'Test Title',
  body: 'Test Body',
  created_at: '2021-01-01',
  updated_at: '2021-01-01',
  user: {
    id: '1',
    avatar: { url: 'avatar-url' }
  }
};

jest.mock('../../../hooks/useCategorys', () => ({
  __esModule: true,
  default: () => ({
    getCategoryName: jest.fn(id => {
      if (id === 1) return 'Category 1';
      if (id === 2) return 'Category 2';
      return '';
    })
  })
}));

jest.mock('../../../hooks/useTargets', () => ({
  __esModule: true,
  default: () => ({
    getTargetName: jest.fn(id => {
      if (id === 1) return 'Target 1';
      if (id === 2) return 'Target 2';
      return '';
    })
  })
}));

describe('ForumInfo', () => {
  it('renders forum information correctly', () => {
    render(
      <BrowserRouter>
        <ForumInfo forum={forum} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
    expect(screen.getByText('Target 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('3 日間')).toBeInTheDocument();
    expect(screen.getByText('¥4000')).toBeInTheDocument();
  });
});
