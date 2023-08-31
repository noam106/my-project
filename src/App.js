import logo from './logo.svg';
import './App.css';
import Header from './header/Header';
import Search from './itemView/Search';
import Item from './itemView/Item';
import ItemExpended from './itemView/ItemExpended';
import ItemList from './itemView/ItemList';
import InterestedList from './interestedList/InterestedList';
import ReadReview from './reivew/ReadReview';
import WriteReview from './reivew/WriteReview';
import { Outlet } from 'react-router-dom';
import ItemPage from './itemView/ItemPage';
import axios from 'axios';
import { SetUserContext } from './context/UserContext';
import { ME_URL } from './infra/Urls';
import { useContext, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import SearchItemByType from './search/SearchItemByType';
import Gallery from './infra/galleryTest';

function App() {
  const setUser = useContext(SetUserContext)

  useEffect(
    () => {
      const fetchData = async () => {
        // const token = localStorage.getItem('token')
        // if (token) {
          const meResponse = await axios.get(ME_URL)
            // {headers: {Authorization: `Bearer ${token}`}})
          console.log("app log", meResponse)
          setUser({
            user: {...meResponse.data}
          })
        // }
      }
      fetchData()
    },[]
  )

  return (
    <>
    <Header />
    <ItemPage />
    {/* <Gallery />  */}
    {/* <Search />
   
    <ItemExpended />
    <ItemList />
    <InterestedList />
    <ReadReview />
    <WriteReview /> */}
    <Outlet/>
    </>
  );
}

export default App;
