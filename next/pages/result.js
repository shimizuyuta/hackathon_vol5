import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from "@mui/material/Button";
import { useRouter } from 'next/router'

const Result = () => {

    const [image, setImage] = useState()
    const router = useRouter();
    const userData = router.query.input;
    userData = JSON.parse(userData);

    console.log(userData.age);
    console.log(userData);
    

    // useEffect(() => { 
    // console.log(query)
    // console.log(router.query)

    // },[]);

    // useEffect(() => {
    //     axios.get(
    //         'https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png',
    //         {responseType: 'blob',}
    //         )
    //         .then(res => {
    //           setImage([URL.createObjectURL(res.data)])
    //         })
    // }, [])

    return (
        <div>
          {/* {userData} */}
          {/* <div>
          {userData.age} 
          </div>
          <div>
            {userData.bmi.height} 
          </div>
          <div>
            {userData.bmi.weight} 
          </div> */}
        
          {/* <List>
            <ListItem disablePadding>
              <ListItemText primary="Age" secondary={info.age} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Beauty" secondary={info.age} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Height" secondary={info.bmi.height} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Weight" secondary={info.bmi.weight} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="BMI" secondary={info.bmi} />
            </ListItem>
          </List> */}
        </div>
        
    )
}

export default Result;