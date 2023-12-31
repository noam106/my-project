import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { useShare } from './shareItem/ShareItem';
import { ITEM_SHERE_URL } from '../infra/Urls';
import { UserContext } from '../context/UserContext';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const handleSherClick = () => {
  return
}

export default function ItemExpended({item}) {
  const [expanded, setExpanded] = React.useState(false);
  
  const openShare = useShare(item?.name,`${ITEM_SHERE_URL}/${item.id}`)
    
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{width:'100%',maxWidth:'300px'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {(item && item.user &&  (item.user.img_url ? <img src={ item.user.img_url}/> : <span>{item.user.first_name[0]}</span> )  )}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.name}
        subheader={item.item_type}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.item_img.length > 0 ? item.item_img[0] : null}
        alt="No image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Price {item.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={openShare}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph className='home-page-style'>More about the {item.item_type}:</Typography>
          <Typography paragraph>
            {item.description}
          </Typography>
          <Typography paragraph className='home-page-style'> 
          {item.item_type} condition: 
          </Typography>
          <Typography paragraph>
            {item.item_condition}
          </Typography>
          <Typography paragraph className='home-page-style'>
            Main colors of the {item.item_type} are: 
          </Typography>
          <Typography paragraph>
            {item.colors}
          </Typography>
          <Typography paragraph className='home-page-style'>
          Delivery method: 
          </Typography>
          <Typography paragraph>
            {item.delivery_method}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}