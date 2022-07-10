import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from "@mui/material/Button";
import { useRouter } from 'next/router'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Result = () => {

    const [image, setImage] = useState()
    const router = useRouter();
    let userData = router.query.input;
    userData = JSON.parse(userData);
    // const userData = JSON.parse(router.query.input);
    // console.log(typeof(userData))
    console.log(userData,'fafaa')

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

          <p>年齢：{userData.age}</p>
          <p>顔面偏差値：{userData.beauty}</p>
          <p>身長：{userData.bmi.height}</p>
          <p>体重：{userData.bmi.weight}</p>
          <p>性格：{userData.character}</p>
          <p>性別：{userData.gender}</p>

        </div>
        
    )
}

export default Result;