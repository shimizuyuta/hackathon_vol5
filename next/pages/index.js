import React from 'react'
import WebcamCapture from '../components/WebcamCapture'
import Loading from '../components/Loading'
import Result from './result'
import style from '../styles/Index.module.css'
//これがエラーの基っぽい
// import video1 from '../public/movie.mp4'
// import video2 from '../assets/movie.mp4'


const index = () => {
  return (
    <div>
      <title>
        Henkenizer
      </title>
    <div className="main">
      <video autoPlay muted loop>         
        <source src="/movie.mp4" type="video/mp4"/>       
      </video>
      {/* <div id="title">
        <p>Henkenizer</p>
      </div> */}
      <div className={style.content}>
        <p>気になるアノ人、ヘンケナイザーを通して見てみよう。</p>
        <WebcamCapture />
        {/* <Loading /> */}
        {/* <Result /> */}
      </div>
    </div>
  </div>
  )
}

export default index

//mp4はimportができないっぽくてsrcフォルダから直接呼び出すっポイ



