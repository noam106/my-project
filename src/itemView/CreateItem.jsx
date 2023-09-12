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
import { ADD_ITEM_URL, UPLOAD_ITEM_IMG_URL } from '../infra/Urls';
import axios from 'axios';
import { SetNotificationContext } from '../context/NotificationContext';
import ImageUploader from '../components/ImageUploader';
import { SetUserContext, UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useState } from 'react';



export default function Create({open, setOpen}) {

  const setNotification = React.useContext(SetNotificationContext)
  const userContext = React.useContext(UserContext)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const setUserContext = useContext(SetUserContext)
  const [inFlight, setInFlight] = useState(false)
  const [progress, setProgress] = useState(0)
  const [passes, setPasses] = useState([])
  const [msgResponse ,setMsgResponse] = React.useState('Somthing went worng')
  const [formData, setFormData] = React.useState({
    title: '',
    item_type: '',
    colors: '',
    item_condition: '',
    price: '',
    delivery_method: '',
    description: '',
  }); 

  const handleFileSelect = (event) => {

    if (event.target.files) {
      const files = event.target.files;
      setSelectedFiles([...selectedFiles, ...files])
    }
    };

const handleUploadProgress = (progressEvent) => {
    // console.log(progressEvent)
    setProgress(progressEvent.progress * 100)
}

const handleUploadClick = async (file) => {
    setInFlight(true)
    const response = await axios.post(
        UPLOAD_ITEM_IMG_URL,
        {file: file},
        {headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: handleUploadProgress
        }
    )
    setInFlight(false)
    console.log(response)
}

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

    const fData = new FormData(event.target)
    selectedFiles.forEach((file,index) => {
      fData.append(`file`, file)
    })
    // TODO: Handle form submission and API requests here
     try {
      
      const response = await axios.post(ADD_ITEM_URL, fData,{
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });
      console.log(response)
    console.log(selectedFiles)
    /*for (let i = 0; i < selectedFiles.length; i++) {
      console.log('sending file, ', selectedFiles[i])
      await handleUploadClick(selectedFiles[i])
      
    }*/
    // {selectedFiles.map((file) =>(
    //   handleUploadClick(file)
    // ))};
    handleClose()
    setFormData ({
      title: '',
      item_type: '',
      color: '',
      item_condition: '',
      price: '',
      delivery_method: '',
      description: '',
    }); 
    setNotification({open: true, 
      msg: "You have successfully added your item", 
      severity: 'success'});
    setSelectedFiles([])
  } catch (e) {
    console.error(e)
    var errorResponse = e.response.data
    let errorMsg = ""
    if (errorResponse.item_type){
      errorMsg = 'You need to pick a clothe type'
    }
    if (errorResponse.colors){
      console.log('inside colors',errorResponse.colors)
      errorMsg = 'Color field cant be empty'

    }
    if(errorResponse.name){
      errorMsg = 'You have to give a title to your item'
    }
    console.log(errorResponse)
    setNotification({open: true, msg: errorMsg, severity: 'error'})
    // setNotification({open: true, msg:` ${errorData}: ${errorFiled}`, severity: 'error'})
  }
}
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <form onSubmit={handleSubmit}>
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
          name='item_type'
          select
          label="Select"
          defaultValue="Shirt"
          margin="dense"
          helperText="Please select your clothe type"
          value={formData.item_type}
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
          name='item_condition'
          select
          label="Select"
          defaultValue="As New"
          margin="dense"
          helperText="Please select your item condition"
          value={formData.item_condition}
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
          name='delivery_method'
          select
          label="Select"
          defaultValue="Pickup from seller"
          margin="dense"
          helperText="Please select your delivery method"
          value={formData.delivery_method}
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
          name='description'
          label="Item description"
          multiline
          rows={4}
          placeholder="Write your description here"
          margin="dense"
          value={formData.description}
          onChange={handleChange}
        />
          <ImageUploader selectedFiles={selectedFiles} handleFilesChange={handleFileSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Subscribe</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}