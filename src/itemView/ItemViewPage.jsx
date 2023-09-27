import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { BASE_URL, ITEM_SHERE_URL } from "../infra/Urls"
import { IconButton, ImageList, ImageListItem } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './styles.css'
import ItemExpended from "./ItemExpended"
import ShareItem, { useShare } from "./shareItem/ShareItem"
import ShareButton from "react-share/lib/ShareButton"

const useItem = (itemId) => {
    const [item,setItem] = useState(undefined)

    useEffect(() => {
        if(!itemId) {
            return;
        }

        const fetchItem = async () => {
            try { 
                const response = await axios.get( `${BASE_URL}/api/items/${itemId}`) 
                setItem(response.data)
             } catch(e) {  setItem(null)  }
        }
        fetchItem()
      
    },[])

    return item
}


function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
export default function  ItemViewPage () {

    const {itemId} = useParams()

    const item = useItem(itemId)
    console.log(item, "from shere")
    
    const openShare = useShare(item?.name,`${ITEM_SHERE_URL}/${item.id}`)
    if(item === undefined) {
        return  <div>Loading..</div>
    }

    if(item  === null) {
        return <Navigate to = "/items" />
    }

    
    return (
        <div className="item-page">


<div className="item-details">
                   <b>Name</b>
                   <p>{item.name}</p>
                   <b>Price</b>
                   <p>{item.price}</p>
                   <b>Type</b>
                   <p>{item.item_type}</p>
                   <b>Condition</b>
                   <p>{item.item_condition}</p>
                   <b>Color</b>
                   <p>{item.item_color}</p>
                   <b>Delivery method</b>
                   <p>{item.delivery_method}</p>


        <div className="share-like">

            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share"  onClick={openShare}>
             <ShareIcon />
            </IconButton>
            {/*Change to item page url with domain name*/}
        </div>
            </div>
            <ImageList
            sx={{ width: 500, height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
            >
            {item.item_img.map(({img_url}) => (
                <ImageListItem key={img_url} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                    {...srcset(img_url, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>


           
        </div>
      );
}