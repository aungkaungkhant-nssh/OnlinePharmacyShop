import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header';
import classes from './Master.module.css';
function Master({children}) {
  
  return (
    <div className={`${classes.gridContainer}`}>
       <Header/>
        <div className='container' style={{marginBottom:"150px"}}>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Master