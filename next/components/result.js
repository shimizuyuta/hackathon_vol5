import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from "@mui/material/Button";

const Result = () => {

    const [image, setImage] = useState()

    useEffect(() => {
        axios.get(
            'https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png',
            {responseType: 'blob',}
            )
            .then(res => {
              setImage([URL.createObjectURL(res.data)])
            })
    }, [])

    return (
        <div>
            <img src={image} width="500" />
            <Button
              variant="contained"
              component="span"
            >
            他の写真でヘンケナイズしてみる
            </Button>
        </div>
        
    )
}

export default Result;