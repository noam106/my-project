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

function App() {
  return (
    <>
    <Header /> 
    <ItemPage />
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
