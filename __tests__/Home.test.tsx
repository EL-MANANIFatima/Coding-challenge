// import {render,screen} from '@testing-library/react'
// import Home from '../app/page'
// import { describe , test} from 'node:test';
// import '@testing-library/jest-dom/extend-expect';
// import React from 'react';


// //Here we are mocking the child components to only test the Home component
// jest.mock('@/app/components/postsTable/PostTable', () => ({
//     __esModule: true,
//     default: function () {
//       return React.createElement('div', {}, 'PostsTable');
//     },
//   }));
  
//   jest.mock('@/app/components/layout/Layout', () => ({
//     __esModule: true,
//     default: function ({ children }: { children: React.ReactNode }) {
//       return React.createElement('div', {}, `Layout ${children}`);
//     },
//   }));
  
// describe('Home component', ()=>{
//     test('Renders Home and checks for Layout and PostsTbale',()=>{
//         render(<Home/>)
//         expect(screen.getByText(/Layout/i)).toBeInTheDocument();
//         expect(screen.getByText(/PostsTable/i)).toBeInTheDocument();
//     })

// })   