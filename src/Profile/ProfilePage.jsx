import React, { useContext, useState } from 'react';
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


export default function ProfilePage() {
    const userContext = useContext(UserContext)
    const [file, setFile] = useState('')
    const setUserContext = useContext(SetUserContext)
    const [inFlight, setInFlight] = useState(false)
    const [progress, setProgress] = useState(0)
    const [passes, setPasses] = useState([])
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
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
         <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
              <MDBCardImage
                src={imageSource}
                alt="User Image"
                className="rounded-circle"
                style={{ width: '150px' }}
                fluid
                />
                <input
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}/>

                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={handleUploadClick} 
                    disabled={inFlight || file == ''}>Change picture</MDBBtn>
                    {inFlight &&
                    <CircularProgressWithLabel value={progress} />
                    }
                  <MDBBtn outline className="ms-1" onClick={handleUpDateProfile}>Update</MDBBtn>
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
    </section>
  );
}