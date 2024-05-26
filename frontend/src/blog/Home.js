import React from 'react'
function Home() {
  return (
    <div>
      <h1 className='text-center m-4 ' >What is MERN Stack?</h1>
      <div className=' p-3 fs-5 mb-2'>
      MERN stack stands out for its versatility, efficiency, and end-to-end JavaScript implementation when building web applications. 
      It allows developers to leverage a single language, JavaScript, across the entire stack, enabling code reuse and streamlining the development
       process. Here is a brief explanation of the stack’s four components:  
      </div>
      <ul className='fs-5 '>
        <li>MongoDB provides a flexible and scalable data management solution. </li>
        <li>Express.js simplifies writing code and building back-end components for application development. </li>
        <li>React, known for its component-based architecture and efficient rendering, empowers developers to build dynamic and interactive user interfaces. </li>
        <li>Node.js enables fast and event-driven back-end development, facilitating seamless communication between the front-end and back-end components.</li>
      </ul>
    </div>
  )
}

export default Home