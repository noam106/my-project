import { Alert, Snackbar } from "@mui/material";
import { useState } from "react"
import { SetNotificationContext } from "../context/NotificationContext";

const Notifications = ({children}) =>{

    const [notification, setNotifications] = useState({
        open: false,
        msg: "",
        severity: "success"
    })

    const handleClose = (event, reason) =>{
        if (reason === "clickaway") {

        }
        setNotifications({...notification, open: false})
    };
    return(
        <>
        <SetNotificationContext.Provider value={setNotifications}>
            {children}
        </SetNotificationContext.Provider>
        
        <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        // message={notification.msg}
        >
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.msg}
        </Alert>
      </Snackbar>
      </>
    )
}
 export default Notifications