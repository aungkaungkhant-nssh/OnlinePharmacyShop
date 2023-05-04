import React from 'react'
import classes from './CheckOutStep.module.css';
function CheckOutStep({signIn,shipping,payment,placeorder}) {
  return (
    <div className='d-flex justify-content-between'>
        <div className={`${signIn ? classes.check : classes.checkBar}`}>Sign-In</div>
        <div className={`${shipping ? classes.check : classes.checkBar}`}>Shipping</div>
        <div className={`${payment ? classes.check :  classes.checkBar}`}>Payment</div>
        <div className={`${placeorder ? classes.check:  classes.checkBar}`}>PlaceOrder</div>
    </div>
  )
}

export default CheckOutStep