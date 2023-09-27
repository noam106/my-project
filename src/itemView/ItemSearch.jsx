import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import * as clothes from '../infra/ItemList';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { ADD_ITEM_URL, ITEM_LIST_URL } from '../infra/Urls';
import axios from 'axios';
import FilteredGallery from './FilteredGallery';
import { Navigate, useNavigate } from 'react-router-dom';



export default function ItemSearch({open, setOpen}) {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    name: '',
    itemType: '',
    colors: '',
    itemCondition: '',
    max_price: '',
    min_price:'',
    deliveryMethod: '',
    itemDescripion: '',
  }); 

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData, "form search data");
    
    // TODO: Handle form submission and API requests here
     try {
      
      const response = await axios.get(ITEM_LIST_URL, {params: formData})
      console.log(response)
  } catch (e) {
    console.error(e)
  }
  handleClose()
  setFormData({
    name: '',
    itemType: '',
    colors: '',
    itemCondition: '',
    max_price: '',
    min_price:'',
    deliveryMethod: '',
    itemDescripion: '',
  });
  navigate('/search_resolte')
  }
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search Item</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name='name'
            label="Title"
            type="title"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleChange}
          />
        <TextField
          id="itemType"
          name='itemType'
          select
          label="Select"
          defaultValue="Shirt"
          margin="dense"
          helperText="Please select your clothe type"
          value={formData.itemType}
          onChange={handleChange}
        >
          {clothes.CLOTHES_LIST.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
            autoFocus
            margin="dense"
            id="colors"
            name='colors'
            label="Item color"
            // type="color"
            fullWidth
            variant="standard"
            value={formData.colors}
            onChange={handleChange}
          />
          <TextField
          id="itemCondition"
          name='itemCondition'
          select
          label="Select"
          defaultValue="As New"
          margin="dense"
          helperText="Please select your item condition"
          value={formData.itemCondition}
          onChange={handleChange}
        >
          {clothes.ITEM_CONDITION.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Max Amount</InputLabel>
          <OutlinedInput
            id="max price"
            name='max_price'
            startAdornment={<InputAdornment position="start">₪</InputAdornment>}
            label="Max Price"
            defaultValue='0'
            margin="dense"
            value={formData.max_price}
            onChange={handleChange}
          />
        </FormControl>
        
        <TextField
          id="deliveryMethod"
          name='deliveryMethod'
          select
          label="Select"
          defaultValue="Pickup from seller"
          margin="dense"
          helperText="Please select your delivery method"
          value={formData.deliveryMethod}
          onChange={handleChange}
        >
          {clothes.DELIVERY_METHOD.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Min Amount</InputLabel>
          <OutlinedInput
            id="min price"
            name='min_price'
            startAdornment={<InputAdornment position="start">₪</InputAdornment>}
            label="Min Price"
            defaultValue='0'
            margin="dense"
            value={formData.min_price}
            onChange={handleChange}
          />
        </FormControl>
        <TextField
          sx={{ m: 1, width: '25ch' }} variant="outlined"
          id="itemDescripion"
          name='itemDescripion'
          label="Free search"
          multiline
          rows={4}
          placeholder="Write free text for Search"
          margin="dense"
          value={formData.itemDescripion}
          onChange={handleChange}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}