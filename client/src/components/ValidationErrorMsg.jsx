import React from 'react'

function ValidationErrorMsg({validationErrors,inputField}) {
  return (
    validationErrors.find((v)=> v.param === inputField) && (
        <div className='mt-1'>
                <span className='text-danger'>{validationErrors.find((v)=> v.param === inputField).msg}</span>
        </div>
    )
  )
}

export default ValidationErrorMsg