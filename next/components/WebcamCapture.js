import React from "react";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import Image from 'next/image';
import style from '../styles/WebcamCapture.module.css'
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import noImageIcon from '../public/noImageIcon2.jpg'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

//TODO
//カメラのサイズ・キャプチャーサイズを変更する必要あり・該当部分3箇所(該当部分にコメントあり)
//最初にエラーが出る　→　next-dev.js:29 Warning: Prop `id` did not match. Server: "0.8" Client: "0.47"
//90行目


//カメラのサイズ・キャプチャーサイズを変更する必要あり
const videoConstraints = {
  facingMode: FACING_MODE_USER,
  width:300,
  height:100
};

const WebcamCapture = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const webcamRef = useRef(null);
  const [isCaptureable,setIsCaptureable] = useState(false); 
  const [url,setUrl] = useState(noImageIcon);
  const inputId = Math.random();

  // 内・外カメの切り替え
  const switchCamera = useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);
  // カメラの起動
  const startUpCamera = () =>{
    setIsCaptureable(!isCaptureable);
  }

  //キャプチャー
  const captureCamera = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc){
      setUrl(imageSrc)
    }
  },[webcamRef])
  

  // フォルダーから写真
  const handleImage = (e) => {
    const i = e.target.files[0]
    // ここqiitaにまとめる
    const folderImg = URL.createObjectURL(i)
    setUrl(folderImg)
  }

  return (
    <>
      {/* カメラのサイズ・キャプチャーサイズを変更する必要あり */}
      <Image src={url} alt='写真が表示されます' width="500px" height="300px" objectFit="contain" />
      {isCaptureable ?
      <>
      <Stack spacing={2} direction="row" alignContent="center">
          <button 
            onClick={switchCamera} 
            className={style.button}
          >
            <FlipCameraIosIcon/>
          </button>
          <button 
            onClick={startUpCamera} 
            className={style.button}
          >
            Turn off Camera
          </button>
          <button 
            onClick={captureCamera} 
            className={style.button}
          >
            Capture Camera
          </button>
        
          {/* カメラのサイズ・キャプチャーサイズを変更する必要あり */}
          <Webcam
            audio={false}
            height={260}
            width={340}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              ...videoConstraints,
              facingMode
              
            }}
            ref={webcamRef}
          />
        </Stack>
        </>:
        <>
        <Stack spacing={2} direction="row" alignContents="center">
          <button onClick={startUpCamera} className={style.button}>Turn on Camera</button>
          {/* labelのところがなぜか動かない・TODO:buttonのところを調査 */}
          {/* <label htmlFor={inputId}>
            <button  className={style.button} >open Folder</button>
            <input
              id={inputId}
              type="file"
              accept="image/*,.png,.jpg,.jpeg,.gif"
              style={{display:'none'}}
              onChange={(e) => handleImage(e)}
            />
          </label> */}
        
          <label htmlFor={inputId}>
            <Button
              variant="contained"
              component="span"
              className={style.button}
          >
            画像追加
            </Button>
            <input
              id={inputId}
              type="file"
              multiple
              accept="image/*,.png,.jpg,.jpeg,.gif"
              onChange={(e) => handleImage(e)}
              style={{ display: "none" }}
            />
          </label>
        </Stack>

        </>
      }
    </>
  );
};

export default WebcamCapture


