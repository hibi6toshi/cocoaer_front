// Provider で、
// const PietyCategoryContext = createContext<{}>({});
// export const usePietyCategoryContext = () => useContext(PietyCategoryContext);
// しており、useCategoryでは
// const useCategorys = () => {
// const pietyCategorys = usePietyCategoryContext() as PietyCategoryDict;
// しているため、MockPietyCategoryContextの値を渡せないため保留
it("", ()=>{})

// import { createContext } from 'react';
// import { renderHook } from '@testing-library/react';
// import useCategorys from '../../hooks/useCategorys';

// // モックコンテキスト
// const MockPietyCategoryContext = createContext({});

// describe('useCategorys', () => {
//   it('returns category name correctly', () => {
//     const categoryDict = {
//       1: 'Category 1',
//       2: 'Category 2'
//     };

//     const wrapper = ({ children }) => (
//       <MockPietyCategoryContext.Provider value={categoryDict}>
//         {children}
//       </MockPietyCategoryContext.Provider>
//     );

//     const { result } = renderHook(() => useCategorys(), { wrapper });

//     const categoryName = result.current.getCategoryName(1);
//     expect(categoryName).toBe('Category 1');
//   });

//   it('returns pietyCategorys dictionary correctly', () => {
//     const categoryDict = {
//       1: 'Category 1',
//       2: 'Category 2'
//     };

//     const wrapper = ({ children }) => (
//       <MockPietyCategoryContext.Provider value={categoryDict}>
//         {children}
//       </MockPietyCategoryContext.Provider>
//     );

//     const { result } = renderHook(() => useCategorys(), { wrapper });

//     const pietyCategorysDict = result.current.getPietyCategorysDict();
//     expect(pietyCategorysDict).toEqual([
//       { value: '1', label: 'Category 1' },
//       { value: '2', label: 'Category 2' }
//     ]);
//   });
// });
