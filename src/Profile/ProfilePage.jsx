import React, { useContext, useRef, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { SetUserContext, UserContext } from "../context/UserContext"
import { UPLOAD_PROFILE_IMG_URL } from '../infra/Urls';
import axios from 'axios';
import { CircularProgressWithLabel } from '../infra/circularProgress/circularProgress';
import UpdateProfile from './UpdateProfile';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import FilteredGallery from '../itemView/FilteredGallery';


export default function ProfilePage() {
    const userContext = useContext(UserContext)
    const [file, setFile] = useState('')
    const setUserContext = useContext(SetUserContext)
    const [inFlight, setInFlight] = useState(false)
    const [progress, setProgress] = useState(0)
    const [passes, setPasses] = useState([])
    const ref = useRef()

    console.log(userContext)
    let imageSource = userContext?.user?.img_url;
    if (!imageSource) {
        imageSource = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
    }
    
    const handleFileSelect = (event) => {

        if (event.target.files) {
          setFile(event.target.files[0])
        }
      }

    const handleUploadProgress = (progressEvent) => {
        // console.log(progressEvent)
        setProgress(progressEvent.progress * 100)
    }

    const handleUploadClick = async () => {
        setInFlight(true)
        try {
            const response = await axios.post(
                UPLOAD_PROFILE_IMG_URL,
                {file: file},
                {headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: handleUploadProgress
                }
            )
         setUserContext({user: {...userContext.user, img_url:response.data}})
         console.log("Response:")
         console.log(response)
        } catch(e) {
            console.error(e.message)
        }
        setInFlight(false)
    }

    const handleUpDateProfile = (event) =>{
        <UpdateProfile/>
    } 


    if(!userContext.user) {
        return <Navigate to ="/"/>
    }


  return (
    <section style={{ backgroundColor: '#eee',display:'flex',flexDirection:'column',alignItems:'center',width:'80%',minWidth:'400px',marginInline:'auto',marginBlock:'16px' }}>
      <MDBContainer className="py-5">
         <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center" style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
             
              <MDBCardImage
                src={imageSource}
                alt="User Image"
                onClick={() => {
                  ref.current?.click()
                }}
                className="rounded-circle"
                style={{ width: '100px',height:'100px',borderRadius:'50%',objectFit:'cover',objectPosition:'center' }}
                fluid
                />
                <br/>
                <input
                    type="file" 
                    style={{display:'none'}}
                    ref={ref}
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}/>

                <div style={{display:'flex',marginBlock:'8px',flexDirection:'row',columnGap:'8px'}}>
                  <MDBBtn onClick={handleUploadClick} 
                    disabled={inFlight || file == ''}>Change picture</MDBBtn>
                    {inFlight &&
                    <CircularProgressWithLabel value={progress} />
                    }
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userContext.user.first_name} {userContext.user.last_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userContext.user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userContext.user.phone_number}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userContext.user.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
         </MDBCol>
        </MDBRow>
      </MDBContainer>
      <h1>Your item list</h1>
    <FilteredGallery filters={{user: userContext.user.id}} />
    <h1 className="home-page-style">Hi {userContext.user.first_name} thosh item are still waiting for you</h1>
    </section>
    
  );
}