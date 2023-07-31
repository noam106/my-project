import logo from './logo.svg';
import './App.css';
import Header from './header/Header';
import Search from './search/Search';
import Item from './itemView/Item/Item';
import ItemExpended from './itemView/itemExpended/ItemExpended';
import ItemList from './itemView/itemList/ItemList';
import InterestedList from './interestedList/InterestedList';
import ReadReview from './reivew/ReadReview';
import WriteReview from './reivew/WriteReview';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <h1> my app</h1>
    {/* <Header />
    <Search />
    <Item />
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
