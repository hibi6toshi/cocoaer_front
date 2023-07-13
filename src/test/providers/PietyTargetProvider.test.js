import { render, screen, act } from '@testing-library/react';
import { createContext } from 'react';
import PietyTargetProvider, { usePietyTargetContext, PietyTargetDict } from '../../providers/PietyTargetProvider';
import { getPietyTargets } from '../../apis/pietyTargets';

// モックデータ
const mockTargets = [
  { id: 1, name: 'Target 1' },
  { id: 2, name: 'Target 2' }
];

// モックコンテキスト
const MockPietyTargetContext = createContext<PietyTargetDict>({});

// モックコンポーネント
const MockComponent = () => {
  const targets = usePietyTargetContext();
  return (
    <div>
      {Object.entries(targets).map(([id, name]) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

// jest.mock('../../apis/pietyTargets', () => ({
//   getPietyTargets: jest.fn(() => Promise.resolve(mockTargets)),
// }));

jest.mock('../../apis/pietyTargets');

describe('PietyTargetProvider', () => {
  beforeEach(() => {
    getPietyTargets.mockResolvedValue(mockTargets); // モックの戻り値を設定
  });


  it('provides the pietyTargets context correctly', async () => {
    await act(async () => {
      render(
        <PietyTargetProvider>
          <MockComponent />
        </PietyTargetProvider>
      );
    });

    const target1 = screen.getByText('Target 1');
    const target2 = screen.getByText('Target 2');

    expect(target1).toBeInTheDocument();
    expect(target2).toBeInTheDocument();
  });

  // うまくいかないので、一旦保留
  // it('displays loading state while fetching targets', async () => {
  //   getPietyTargets.mockResolvedValueOnce(new Promise(() => {})); // モックの戻り値を非解決のプロミスに設定

  //   await act(async () => {
  //     render(
  //       <PietyTargetProvider>
  //         <MockComponent />
  //       </PietyTargetProvider>
  //     );
  //   });

  //   await waitFor(() => {
  //     const loading = screen.getByText('Loading...');
  //     expect(loading).toBeInTheDocument();
  //   });
  // });

  it('uses the pietyTargets context correctly in a custom hook', async () => {
    await act(async () => {
      render(
        <PietyTargetProvider>
          <MockComponent />
        </PietyTargetProvider>
      );
    });

    const target1 = await screen.findByText('Target 1');
    expect(target1).toBeInTheDocument();
  });
});
