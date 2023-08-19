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
import { ADD_ITEM_URL } from '../infra/Urls';
import axios from 'axios';



export default function Create({open, setOpen}) {

  const [formData, setFormData] = React.useState({
    title: '',
    itemType: '',
    color: '',
    itemCondition: '',
    price: '',
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
    console.log(formData);
    // TODO: Handle form submission and API requests here
     try {
      
      const response = await axios.post(ADD_ITEM_URL, {
        name: formData.title,
        item_type: formData.itemType,
        colors: formData.color,
        description: formData.itemDescripion,
        price: formData.price,
        item_condition: formData.itemCondition,
        free_delivery: formData.deliveryMethod             
    }) 
  } catch (e) {
    console.error(e)
  }
}
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name='title'
            label="Title"
            type="title"
            fullWidth
            variant="standard"
            value={formData.title}
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
            id="color"
            name='color'
            label="Item color"
            // type="color"
            fullWidth
            variant="standard"
            value={formData.color}
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
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="price"
            name='price'
            startAdornment={<InputAdornment position="start">₪</InputAdornment>}
            label="Price"
            defaultValue='0'
            margin="dense"
            value={formData.price}
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
        <TextField
          sx={{ m: 1, width: '25ch' }} variant="outlined"
          id="itemDescripion"
          name='itemDescripion'
          label="Item description"
          multiline
          rows={4}
          placeholder="Write your description here"
          margin="dense"
          value={formData.itemDescripion}
          onChange={handleChange}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}