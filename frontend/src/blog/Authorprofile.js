import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Authorprofile() {

  let {currentUser} = useSelector(state => state.userAuthorLoginReducer)

  return (
    <div>
    <div className='  mt-3 fs-5 d-flex mx-4 justify-content-center'>
        <ul className='nav'>
            <li className='nav-item'>
            <Link className='nav-link text-dark' to={`articles-by-author/${currentUser.username}`}>Articles</Link>
            </li>


            <li className='nav-item'>
            <Link className='nav-link text-dark' to="new-article">Add new</Link>
            </li>

            


        </ul>
    </div>
    <Outlet/>
    </div>
  )
}

export default Authorprofile
