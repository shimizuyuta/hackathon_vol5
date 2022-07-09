import React from 'react'
import WebcamCapture from '../components/WebcamCapture'

const index = () => {
  return (
    <div>
        <title>Henkenizer</title>
        <h1>Henkenizer</h1>
        <div id="explain">
          気になるアノ人、ヘンケナイザーを通して見てみよう。
        </div>
      <WebcamCapture />
    </div>
  )
}

export default index



