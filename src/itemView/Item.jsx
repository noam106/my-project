import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Item({item}) {

    const navigate = useNavigate()

    const handleClick = () => {
        console.log('blabal')
        navigate(`/items/${item.id}`)
    }

    return(
        <ListItem sx={{height: '500px'}}>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={`${item.name} => ${item.item_type}`} />
            </ListItemButton>
        </ListItem>
    )
}