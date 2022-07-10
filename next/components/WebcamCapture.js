import React from "react";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import Image from 'next/image';
import style from '../styles/WebcamCapture.module.css'
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import noImageIcon from '../public/noImageIcon2.jpg'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router';

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

function _convertToFile (imgData, file) {
  // ここでバイナリにしている
  const blob = atob(imgData.replace(/^.*,/, ''));
  let buffer = new Uint8Array(blob.length);
  for (let i = 0; i < blob.length; i++) {
    buffer[i] = blob.charCodeAt(i);
  }
  return new File([buffer.buffer], file.name, {type: file.type});
}

const WebcamCapture = () => {
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const webcamRef = useRef(null);
  const [isCaptureable,setIsCaptureable] = useState(false); 
  const [url,setUrl] = useState(noImageIcon);
  const inputId = Math.random();
  const [personData,setPersonData] = useState(null)
  const router = useRouter();  

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
    // const folderImg = URL.createObjectURL(i)
    // setUrl(folderImg)
    setUrl(i)
  }

  const onSubmit = () => {
    console.log(url,'Url*+*+++++')
    const header = { headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      }}
    // (1)ファイルをバイナリ化
    let bin = atob(url.replace(/^.*,/, ''));

    // (2)バイナリデータに変換する
    let buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }

    // (3)Fileオブジェクトを生成
    let image_file = new File([buffer.buffer], 'test.jpeg', {type: 'multipart/form-data'});
    console.log('ユーアールエル',url);
    const imgFile = _convertToFile(url, 'url')
    console.log('いいいい',imgFile);
    const data = new FormData();
    data.append('image_file', image_file);
    console.log('これが中身', data.get('file'));
    const postImageUri = 'https://henkeniser.herokuapp.com/analyze'
    // console.log('url+++++',url)
    // console.log('url+++++',url[data])
    // console.log(data,'DDDDDDDDDDD')
    // axios.post(postImageUri, data, header)
    axios({
      method: "POST",
      url: postImageUri,
      data: data,
      config: { headers: header },
      headers: {"Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*"},
      
    })
    .then(res => {
      console.log(res)
      console.log(res.data)
      const resJson = JSON.stringify(res.data)
      router.push({
        pathname:"/result",   //URL
        query: {input :resJson} //検索クエリ
      });
    })
    .catch(err => {
      console.log('*********',err.message)
    })
      
  }

  return (
    <>
      {/* カメラのサイズ・キャプチャーサイズを変更する必要あり */}
      <Image src={url} alt='写真が表示されます' width="500px" height="300px" objectFit="contain" />
      {isCaptureable ?
      <>
      <Webcam
            audio={false}
            height="720px"
            width="360px"
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 720,
              height: 360,
              facingMode: 'user'
            }}
            ref={webcamRef}
          />
      <Stack spacing={2} direction="row" aligncontent="center">
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
            カメラを閉じる
          </button>
          <button 
            onClick={captureCamera} 
            className={style.button}
          >
            撮影する
          </button>
        
          {/* カメラのサイズ・キャプチャーサイズを変更する必要あり */}
        </Stack>
        </>:
        <>
        <Stack spacing={2} direction="row" aligncontents="center">
          <button onClick={startUpCamera} className={style.button}>カメラを起動する</button>
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
            画像を追加する
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
          <Button
              variant="contained"
              component="span"
              className={style.button}
              onClick={onSubmit}
          >
            ヘンケナイズする
          </Button>
          <Link href='/result'>
            <a>push </a>
          </Link>
        </Stack>
        {personData? 
          <div>hello</div>
          :<div>fafa</div>
          }

        </>
      }
    </>
  );
};

export default WebcamCapture


