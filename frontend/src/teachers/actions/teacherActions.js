import axios from "axios";
import {getTokenConfig} from "./classroom";
import {ADD_SEMESTER, ADD_SUBJECT} from "./types";
import store from "../../store";

const dispatch=store.dispatch;


export const createSemester = async (data)=>{

    const config=getTokenConfig();
    console.log(data);

    const response=await axios.post("http://127.0.0.1:8000/api/classroom/semester/",data,config)

    if (response.status==200){
        dispatch(
            {
                type:ADD_SEMESTER,
                payload:response.data
            }
        );
    }

}


export const createSubject = (data)=>{

    const config=getTokenConfig();
    console.log(data);

    axios.post("http://127.0.0.1:8000/api/classroom/subject/",data,config).then((resp)=>{
        console.log(resp);
        dispatch({
            type:ADD_SUBJECT,
            payload:resp.data
        })

        console.log("Dispatched Add Subject")
    }).catch((error)=>{
        console.log(error);
    })


}

