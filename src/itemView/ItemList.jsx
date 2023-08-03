import { List } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import Item from "./Item";

export default function ItemList({items, loadMore}) {

    const {count, next, results} = items

    const clothes = results.map((item) => {
        return <Item key={Item.id} item={item} />
    })

    return(
        <List>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={next !== null}
                loader={<div className="loader" key={0}>Loading ...</div>}>
                    {clothes}
            </InfiniteScroll>
        </List>
    )
}