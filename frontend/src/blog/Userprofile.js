import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function Userprofile() {
  return (
    <div> 

      <ul className='nav'>
            <li className='nav-item'>
              <Link className='nav-link text-dark fs-2' to='articles'>Articles</Link>
            </li>
        </ul>

      <Outlet />
    </div>
  )
}

export default Userprofile
