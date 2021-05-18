import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      minHeight: "60vh",
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius:"10px"
    },
    
    actionBtn:{
        fontSize:"0.8rem",
        lineHeight:"None",
        borderRadius:"0.2rem",
        fontWeight:"bold"
    },
    globalStdName:{
        color:"grey",
        
    },

    // {Table body}
    studentsListBody:{  
      minxHeight:"50rem",
      overflow:"scroll",

      "& .MuiTableCell-root":{
        padding:"2px"
      }

    },

    // Student Table
    stdTable:{

      marginTop:"15px",
      borderCollapse: "separate",
      borderSpacing: "0px 4px",

      "& .MuiTableCell-head":{
        padding:"0px",
        fontSize: "1rem",
        fontFamily:"Ubuntu",
        fontWeight:"505"
        
      },

      "& .MuiTableCell-root":{
        border:"None",
        fontFamily:"Ubuntu",
        fontWeight:"505"
      }
    },

    remove_btn:{
      padding:"0px"  
    },

    stdNameCell:{
      color: "#5a5959"
    }
  
  
  }));

  