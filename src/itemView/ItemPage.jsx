import axios from "axios"
import { useEffect, useState } from "react"
import * as urls from "../infra/Urls";
import { Button, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ItemsSearch from "./ItemSearch";
import ItemList from "./ItemList";


export default function ItemPage() {

    const navigate = useNavigate()
    const [items, setItems] = useState({results:[]})

    const fetchData = async () => {
        let urlToSend = urls.ITEM_LIST_URL
        if (items.results.length > 0) {
            urlToSend = items.next
        }
        try {
            const response = await axios.get(urlToSend)
            console.log(response)
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
        </>

    )
}
