import React,{useState} from 'react'
import Sidebar from './Sidebar'
import classes from './Master.module.css';
import Content from './Content';
function Master({children}) {
  const [mobileShowSidebar,setmobileShowSidebar] = useState(false);
  const hideSidebar =()=>{
    setmobileShowSidebar(false)
  }
  const openSidebar = ()=>{
    setmobileShowSidebar(true)
  }

  return (
    <section className={`container-fluid ${classes.main}`}>
      <div className='row'>
          <Sidebar mobileShowSidebar={mobileShowSidebar} hideSidebar={hideSidebar} />
          <Content openSidebar={openSidebar}>
              {children}
          </Content >
      </div>
    </section>
  )
}

export default Master