import React from 'react'

function Footer() {
  return (
<div className=' border border-dark p-2 mb-3'>
<ul class="nav">
    <h4 className='p-1 ms-2'>Used technologies</h4>
  <li className="nav-item">
    <a className="nav-link active" >React js</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" >MongoDb</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" >Node js</a>
  </li>
  <li className="nav-item">
    <a className="nav-link">Express js</a>
  </li>
</ul>
</div>
  )
}

export default Footer