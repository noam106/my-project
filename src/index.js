import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import UserInfo from './userInfo/UserIfo';
import ItemExpended from './itemView/ItemExpended';
import ReadReview from './reivew/ReadReview';
import LoginPage from './login/LoginPage';
import UserProvider from './context/UserContext';
import SearchItemByType from './search/SearchItemByType';
import SignupPage from './signUp/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'home/',
        element: <Home/>
      },
      {
        path: 'rewiew/',
        element: <ReadReview />
      },
      {
        path: 'me/',
        element: <UserInfo />,
      },
      // {
      //   path: 'search/',
      //   element: <SearchItemByType />,
      // },
      {
        // dynamic path - will receive game id (note :)
        // path: "Items/:itemId",
        path: 'items/',
        element: <ItemExpended />
      },
      {
        path: 'review/',
        element: <ReadReview />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<UserProvider>
  <RouterProvider router={router} />
</UserProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
