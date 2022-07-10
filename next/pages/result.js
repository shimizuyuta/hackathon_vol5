import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from "@mui/material/Button";
import { useRouter } from 'next/router'

const Result = () => {

    const [image, setImage] = useState()
    const router = useRouter();
    const userData = router.query.input;
    

    useEffect(() => { 
      // console.log(query)
      // console.log(router.query)

    },[]);

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
          {userData}
        </div>
        
    )
}

export default Result;