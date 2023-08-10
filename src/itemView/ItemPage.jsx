import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../infra/Urls";
import { Button, Fab, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ItemsSearch from "./ItemSearch";
import ItemList from "./ItemList";
import AddIcon from '@mui/icons-material/Add';
import CreateItem from "./CreateItem";


export default function ItemPage() {

    const navigate = useNavigate()
    const [items, setItems] = useState({results:[]})
    const [openAddItem, setOpenAddItem] = useState(false);

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


        <Button onClick={() => {navigate('/orders')}}>Go to orders</Button>
        <Fab color="primary" aria-label="add" 
        sx={{position: 'absolute',bottom: 16, right: 16,}}>
            <AddIcon />
        </Fab>
        {/* <CreateItem open={openAddItem} setOpen={setOpenAddItem}/> */}
        </>

    )
}
