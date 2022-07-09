import React from 'react'
import Loading from '../components/Loading'
import WebcamCapture from '../components/WebcamCapture'
import style from '../styles/Index.module.css'
//これがエラーの基っぽい
// import video1 from '../public/movie.mp4'
// import video2 from '../assets/movie.mp4'


const index = () => {
  return (
    <div className="main">
      <video autoPlay muted loop>         
        <source src="/movie.mp4" type="video/mp4"/>       
      </video>
      <div className={style.content}>
        <p>偏見iser</p>
        <WebcamCapture />
        <Loading />
      </div>
    </div>
  )
}

export default index

//mp4はimportができないっぽくてsrcフォルダから直接呼び出すっポイ



