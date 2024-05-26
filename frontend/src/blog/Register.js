import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
  let{register,handleSubmit,formState:{errors}} = useForm();
  let[err,setErr] = useState('')
  let navigate = useNavigate()

  async function handleSubmitButton(userCred){
    //make http post req
    let res = await axios.post('http://localhost:4000/user-api/user',userCred) 
    console.log(res)
    if(res.data.message==='user created'){
        //navigate to login
        navigate('/register')
    }else{
      setErr(res.data.message)
    }
    }

    return (
      <div>
        <form className='m-auto  w-25 mt-5 card shadow p-3' onSubmit={handleSubmit(handleSubmitButton)} >
          <div>
          <h3 className='text-center fs-3 mb-3'>Register Form</h3>
          {/*display user registration err message*/} 
          {err.length!=0 && <p className='text-danger fs-4'>{err}</p>}

          <label htmlFor=" username" className='form-label mb-4 mt-3 '>Register as</label>
          <div className='form-check form-check-inline ms-2'>
            <input type="radio" className='form-check-input' id="user" value="user" {...register("userType")}/>
            <label htmlFor=" username" className='form-check-label'>User</label>
          </div>

          <div className='form-check form-check-inline'>
            <input type="radio" className='form-check-input' id="user" value="author" {...register("userType")}/>
            <label htmlFor=" username" className='form-check-label'>Author</label>
          </div>
          </div>

          <div className='mb-3'>
            <label htmlFor=" username" className='form-label mb-2'>Email</label>
            <input type='text' id="uname" className='form-control ' {...register("username",{required:true})}></input>
            {errors.username?.type==='required' && <p className='text-danger'>please enter email</p>}
          </div>

          <div className='mb-3'>
            <label htmlFor=" username" className='form-label mb-2'>Username</label>
            <input type='text' id="uname" className='form-control ' {...register("username",{required:true})}></input>
            {errors.username?.type==='required' && <p className='text-danger'>please enter username</p>}
          </div>
        
        <div className='mb-3'>
        <label htmlFor=" password" className='form-label'>Password</label>
          <input type='password' id="password" className='form-control'  {...register("password",{required:true})}></input>
          {errors.password?.type==='required' && <p className='text-danger'>please enter password</p>}
        </div>
  
        <button className='btn btn-primary mt-2 w-25 d-block m-auto'>Register</button>
        </form>
        
      </div>
    )
}

export default Register;
