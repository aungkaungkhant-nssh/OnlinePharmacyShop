import React from 'react'
import { TailSpin } from  'react-loader-spinner'
function LoadingBox() {
  return (
    <div className='my-3' style={{width:"100px",margin:"0px auto"}}><TailSpin color="#007bff" height={80} width={80} /></div>
  )
}

export default LoadingBox