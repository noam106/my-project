
import { IconButton, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Item({item}) {

    const navigate = useNavigate()

    const handleClick = () => {
        console.log('blabal')
        navigate(`/items/${item.id}`)
    }

    return(
        <ListItem>
            {/* <Box> */}
            <Paper elevation={3} 
                sx={{width: '100%',  height: 60, 
                    textAlign: 'center', 
                    display:'flex', flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: '2em'}}>
                <Typography>{`${item.item_type} => ${item.price}`}</Typography>
                <IconButton>
                    <ArrowCircleRightIcon onClick={handleClick} color="primary"/>
                </IconButton>
            </Paper>
            {/* </Box> */}
            {/* <ListItemButton onClick={handleClick}>
                <ListItemText primary={`${flight.origin_city} => ${flight.dest_city}`} />
            </ListItemButton> */}
        </ListItem>
    )
}