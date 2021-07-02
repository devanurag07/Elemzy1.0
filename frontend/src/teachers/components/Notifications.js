import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";


function Notifications() {
    
    const notificaions=useSelector(state=>state.classroom.notificaions);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar()
    
    const dispatch=useDispatch();
    
    for(let notificaion of notificaions){
        // Creating notificaion
        enqueueSnackbar(notificaion.message,notificaion.options);
        // Clearing the notificaions
        dispatch(
            {type:"CLEAR_NOTIFICATIONS"
        }
        )
    }

    return (
        <div>
            
        </div>
    )
}



export default Notifications
