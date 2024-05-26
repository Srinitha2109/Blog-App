import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAuthorLoginThunk  } from '../redux/slices/userAuthorSlice';

function Login() {
  let{register,handleSubmit,formState:{errors}} = useForm();


  let {loginUserStatus,errorOccured,errMsg,currentUser} = useSelector(state=>state.userAuthorLoginReducer)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  
  function handleSubmitButton(userCred){
    console.log(userCred)
    dispatch(userAuthorLoginThunk(userCred))
    }

    useEffect(()=>{
      if(loginUserStatus===true){
        if(currentUser.userType==='user'){
          // console.log('user')
          navigate('/userprofile')
        }

        else if(currentUser.userType==='author'){
          // console.log('author')
          navigate('/authorprofile')
        }
        // navigate('/userprofile')
      }},[loginUserStatus])


    return (
      <div>
        
        <form className='m-auto  w-25 mt-5 card shadow p-3' onSubmit={handleSubmit(handleSubmitButton)} >

          <div>
          <h3 className='text-center fs-3 mb-3'>Login Form</h3>
          <label htmlFor=" login" className='form-label mb-4  mt-3'>Login as</label>
          <div className='form-check form-check-inline'>
            <input type="radio" className='form-check-input ms-1' id="user" value="user" {...register("userType")}/>
            <label htmlFor="user" className='form-check-label ms-1'>User</label>
          </div>


          <div className='form-check form-check-inline'>
            <input type="radio" className='form-check-input' id="author" value="author" {...register("userType")}/>
            <label htmlFor="author" className='form-check-label'>Author</label>
          </div>
          </div>

          
          <div className='mb-3'>
            <label htmlFor=" username" className='form-label mb-2'>Username</label>
            <input type='text' id="username" className='form-control ' {...register("username",{required:true})}></input>
            {errors.username?.type==='required' && <p className='text-danger'>please enter username</p>}
          </div>
        
        <div className='mb-3'>
        <label htmlFor=" password" className='form-label'>Password</label>
          <input type='password' id="password" className='form-control'  {...register("password",{required:true})}></input>
          {errors.password?.type==='required' && <p className='text-danger'>please enter password</p>}
        </div>
  
        <button className='btn btn-primary mt-2 w-25 d-block m-auto'>Login</button>
        </form>
        
      </div>
    )
}

export default Login;
