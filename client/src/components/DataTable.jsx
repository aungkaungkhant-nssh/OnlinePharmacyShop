import React,{useEffect} from 'react';
import 'jquery/dist/jquery.min';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
function DataTable({data,deleteHandler,handleUpdateRole}) {
    const [tableHeading,setTableHeading] = useState([]);
    const {pathname} = useLocation();
  
    useEffect(()=>{
        $(document).ready(function () {
          setTimeout(function(){
            $('#userLists').DataTable();
           } ,1000);
        });
      if(data.length>0){
      
        setTableHeading(Object.keys(data[0]).slice(1,Object.keys(data[0]).length));
      }
      
      },[data]);
    const {adminAuthUser} = useSelector((state)=>state.adminAuth);
   
  return (
    <table id="userLists" className="table table-hover table-bordered">
        <thead>
            <tr>
                { 
                    tableHeading.map((h)=>{
                        if(h!== "description" && h!=="categoryId" && h!=="numReviews" && h!=="reviews" && h!=="resetToken" && h!=="resetTokenExpiration")return <th>{h}</th>;
                    })
                }
                <th>Action</th> 
            </tr>
        </thead>
        <tbody>  
            {
                data.map((d)=>(
                <tr key={d._id}>
                    {
                        tableHeading.map((t)=>(
                            <>
                                {
                                    t!=="description" && t!=="categoryId" &&  t!=="numReviews" && t!=="reviews" && t!=="resetToken" && t!== "resetTokenExpiration" && (
                                    <td key={t._id}>
                                        {
                                            t==="image" || t==="userimage" ? <img src={d[t]} alt="" style={{width:"50px",borderRadius:"100%",}} />
                                            :  t==="role" ? (
                                                adminAuthUser.role === 1?(
                                                    d.role !==1 ?(
                                                        <>
                                                            <span type="button"  className={`badge badge-${d[t]===1?'success':d[t]===2?"secondary":"warning"} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{cursor:"pointer"}}>
                                                                {d[t] === 1 ? "Owner" : d[t]===2 ? "Assistant" :"Worker"}
                                                            </span>
                                                            <span class="dropdown-menu">
                                                                {
                                                                    d[t] !==3 ?(
                                                                        <button className='btn' onClick={()=>handleUpdateRole(d._id,3)}>Worker</button>
                                                                    ):(
                                                                        <button className='btn' onClick={()=>handleUpdateRole(d._id,2)}>Assistant</button>
                                                                    )
                                                                }
                                                              
                                                               
                                                            </span>
                                                        </>
                                                        
                                                    ):(
                                                        <span className={`badge badge-${d[t]===1?'success':d[t]===2?"secondary":"warning"}`} style={{cursor:"pointer"}}>
                                                             {d[t] === 1 ? "Owner" : d[t]===2 ? "Assistant" :"Worker"}
                                                        </span>
                                                    )
                                                    
                                                ):(
                                                    <span className={`badge badge-${d[t]===1?'success':d[t]===2?"secondary":"warning"}`} style={{cursor:"pointer"}}>
                                                        {d[t] === 1 ? "Owner" : d[t]===2 ? "Assistant" :"Worker"}
                                                    </span>
                                                )
                                              
                                            ):(
                                               d[t]
                                            )
                                        }
                                    </td>
                                    )
                                }
                               
                                
                            </>
                          
                        ))
                    }
                     <td>
                        {
                            pathname === "/admin/lists-product" && <Link to={`/admin/edit-product?edit=true&productId=${d._id}`} className='btn btn-warning btn-sm mr-2 text-white'>
                            <i class="fa-solid fa-pen-to-square"></i>
                             </Link>
                        }
                        <button class="btn btn-danger btn-sm mr-2 " type="submit" onClick={()=>deleteHandler(d._id)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        
                    </td>
                </tr>
                ))
            } 
        </tbody>
    </table>
  )
}

export default DataTable