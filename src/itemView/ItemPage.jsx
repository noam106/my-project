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


export default function ItemPage() {

    const navigate = useNavigate()
    const [items, setItems] = useState({results:[]})
    const [openAddItem, setOpenAddItem] = useState(false);
    const user = useContext(UserContext)
    const setNotification = useContext(SetNotificationContext)


    const fetchData = async () => {
        let urlToSend = urls.ITEM_LIST_URL
        if (items.results.length > 0) {
            urlToSend = items.next
        }
        try {
            const response = await axios.get(urlToSend)
            // console.log(response)
            // console.log(response.data)
            // console.log(items.results)
            
            // console.log(results)
            // setFlights(response.data)
            setItems(
                {...items,
                next: response.data.next,
                results: [...items.results, ...response.data.results]
            }
            )
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(
        () => {
            fetchData()
        }
        ,[]
    )

    return(
        <>
        <h2>Items Page</h2>
        <ItemsSearch />

        <Stack direction={'row'}>
            <ItemList items={items} loadMore={fetchData} />
    
            <Outlet />
        </Stack>


        <Button color='primary' onClick={() => setNotification({open: true, msg: 'going to orders'}) }>Go to orders</Button>

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

    </>
    )
}
