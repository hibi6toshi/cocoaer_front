import { render, screen } from '@testing-library/react';
import ProjectInfo from '../../../features/projects/ProjectInfo';
import { BrowserRouter } from 'react-router-dom';


const project = {
  id: '1',
  user_id: '1',
  piety_target_id: 1,
  piety_category_id: 1,
  limit_day: '2023-07-11',
  cost: 5000,
  title: 'Test Project',
  body: 'Test Body',
  created_at: '2023-07-01',
  updated_at: '2023-07-05',
  user: {
    id: '1',
    avatar: { url: 'avatar-url' }
  },
  tasks: [
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
  ],
  actions: [
    { id: '1', name: 'Action 1' },
    { id: '2', name: 'Action 2' },
  ],
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

describe('ProjectInfo', () => {
  it('renders the project information correctly', () => {
    render(
      <BrowserRouter>
        <ProjectInfo project={project} />
      </BrowserRouter>
    );

    const titleElement = screen.getByText('Test Project');
    const bodyElement = screen.getByText('Test Body');
    const tasksTitleElement = screen.getByText('タスク');
    const actionsTitleElement = screen.getByText('アクション');

    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(tasksTitleElement).toBeInTheDocument();
    expect(actionsTitleElement).toBeInTheDocument();
  });

  it('renders the tasks correctly', () => {
    render(
      <BrowserRouter>
        <ProjectInfo project={project} />
       </BrowserRouter>
    );

    const task1Element = screen.getByText('Task 1');
    const task2Element = screen.getByText('Task 2');

    expect(task1Element).toBeInTheDocument();
    expect(task2Element).toBeInTheDocument();
  });

  it('renders the actions correctly', () => {
    render(
      <BrowserRouter>
        <ProjectInfo project={project} />
     </BrowserRouter>
    );

    const action1Element = screen.getByText('Action 1');
    const action2Element = screen.getByText('Action 2');

    expect(action1Element).toBeInTheDocument();
    expect(action2Element).toBeInTheDocument();
  });

  it('renders a message when there are no tasks', () => {
    const projectWithoutTasks = { ...project, tasks: [] };
    render(
      <BrowserRouter>
        <ProjectInfo project={projectWithoutTasks} />
      </BrowserRouter>
    );

    const noTasksElement = screen.getByText('まだ始まったばかりです！');

    expect(noTasksElement).toBeInTheDocument();
  });

  it('renders a message when there are no actions', () => {
    const projectWithoutActions = { ...project, actions: [] };
    render(
      <BrowserRouter>
        <ProjectInfo project={projectWithoutActions} />
      </BrowserRouter>  
    );

    const noActionsElement = screen.getByText('まだ始まったばかりです！');

    expect(noActionsElement).toBeInTheDocument();
  });
});
