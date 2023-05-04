import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotFoundVector from '../../assets/images/404Page.jpg'
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-md-6 offset-md-3'>
                 <img src={NotFoundVector} alt="" style={{width:"100%"}}/>
                 <div className='text-center mt-3'>
                        <button className='btn btn-primary' onClick={()=>navigate(-1)}>Back To Home <i className="ml-1 fa-solid fa-arrow-right-long"></i></button>
                 </div>
                 
            </div>
        </div>
       
    </div>
  )
}

export default NotFound