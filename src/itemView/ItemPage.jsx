import axios from "axios"
import { useContext, useEffect, useState } from "react"
import * as urls from "../infra/Urls";
import { Button, Fab, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ItemsSearch from "./ItemSearch";
import ItemList from "./ItemList";
import AddIcon from '@mui/icons-material/Add';
import Create from "./CreateItem";
import { UserContext } from "../context/UserContext";
import { SetNotificationContext } from "../context/NotificationContext";
import SearchIcon from '@mui/icons-material/Search';
import Gallery from "../infra/galleryTest";
import FilteredGallery from "./FilteredGallery";

export default function ItemPage() {

    const navigate = useNavigate()
    // const [items, setItems] = useState({results:[]})
    const [openAddItem, setOpenAddItem] = useState(false);
    const [openSearchItem, setOpenSearchItem] = useState(false)
    const user = useContext(UserContext)
    const setNotification = useContext(SetNotificationContext)


    // const fetchData = async () => {
    //     let urlToSend = urls.ITEM_LIST_URL
    //     if (items.results.length > 0) {
    //         urlToSend = items.next
    //     }
    //     try {
    //         const response = await axios.get(urlToSend)
    //         setItems(
    //             {...items,
    //             next: response.data.next,
    //             results: [...items.results, ...response.data.results]
    //         }
    //         )
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }

    // useEffect(
    //     () => {
    //         fetchData()
    //     }
    //     ,[]
    // )

    return(
        <>
        {/*<Stack direction={'row'}>
            <ItemList items={items} loadMore={fetchData} />
    
            <Outlet />
    </Stack>*/}

        <Button color='primary' onClick={() => setNotification({open: true, msg: 'going to orders'}) }>Go to orders</Button>


<div style={{position:'fixed',bottom:'16px', right:'16px',zIndex:'9999'}}>
    {user.user &&
        <>


        <Fab color="primary" aria-label="add" 
            sx={{position: 'absolute',bottom: 16, right: 16,}}
            onClick={() => setOpenAddItem(true)}>
            <AddIcon />
        </Fab>

        <Create open={openAddItem} setOpen={setOpenAddItem}/>
        </>
    }
        <>
        <Fab color="primary" aria-label="search" 
            sx={{position: 'absolute',bottom: 16, right: 90,}}
            onClick={() => setOpenSearchItem(true)}>
            <SearchIcon/>
        </Fab>
        </>
        </div>
        <ItemsSearch open={openSearchItem} setOpen={setOpenSearchItem}/>
        {/* <Gallery items={items} loadMore={fetchData} /> */}
        {/* <Gallery item */}
        <div className="gallery">
            <h1 className="home-page-style">New arrivel</h1>
            <FilteredGallery />
            <h1 className="home-page-style"> Our favorint color BLUE</h1>
            <FilteredGallery filters={{colors: 'blue'}} />
            <h1 className="home-page-style">No more then 50 Shekels</h1>
            <FilteredGallery filters={{max_price: "50"}} />
        </div>

    </>
    )
}
