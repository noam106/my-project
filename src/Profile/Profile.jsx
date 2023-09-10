import { Button } from "@mui/material"
import { useContext, useState } from "react"
import axios from "axios"
import { UPLOAD_PROFILE_IMG_URL } from "../infra/Urls"
import { SetUserContext, UserContext } from "../context/UserContext"
import { CircularProgressWithLabel } from "../infra/circularProgress/circularProgress"


export default function ProfilePage() {

    const userContext = useContext(UserContext)
    const [file, setFile] = useState('')
    const setUserContext = useContext(SetUserContext)
    const [inFlight, setInFlight] = useState(false)
    const [progress, setProgress] = useState(0)
    const [passes, setPasses] = useState([])

    // console.log('Rendering ProfilePage', userContext)
    // console.log('file:', file)

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


    return(
        <>
             <p>Profile page</p>

<img src={userContext?.user?.img_url} height={'150px'}/>
<br />
<input
    type="file" 
    multiple
    accept="image/*"
    onChange={handleFileSelect}/>


<Button onClick={handleUploadClick} 
    disabled={inFlight || file == ''}>UPLOAD</Button>

{inFlight &&
    <CircularProgressWithLabel value={progress} />
}

        </>
    )
}

