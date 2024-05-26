import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { resetState } from '../redux/slices/userAuthorSlice'
function Navbar() {

  let {loginUserStatus,errorOccured,errMsg,currentUser} = useSelector(state=>state.userAuthorLoginReducer)
  // console.log(currentUser)

  let dispatch=useDispatch()

  function logOut(){
    //remove token from local storage
    localStorage.removeItem('token')
    dispatch(resetState())
    
  }

  return (
    <div className='d-flex bg-dark justify-content-end g-2 mt-3 fs-3' >
        <ul className='nav'>
          {loginUserStatus===false?
           <>
            <li className='nav-item'>
             
            <Link className='nav-link text-white fs-5' to="">Home</Link>
            </li>

            <li className='nav-item'>
            <Link className='nav-link text-white fs-5' to="register">Register</Link>
            </li>


            <li className='nav-item'>
            <Link className='nav-link text-white fs-5' to="login">Login</Link>
            </li></> : <li className='nav-item'> 
            <Link className='nav-link text-white fs-5' to="login" onClick = {logOut}>
              
              <p className='fs-4'>Welcome {currentUser.username}</p>Logout</Link>
            </li>}
            
        </ul>
    </div>
  )
}

export default Navbar