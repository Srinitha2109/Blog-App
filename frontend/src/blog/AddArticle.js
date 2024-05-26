import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'


function AddArticle() {
    let {register, handleSubmit} = useForm();
    let {currentUser} = useSelector(state=>state.userAuthorLoginReducer);
    let[err,setErr] = useState("");
    let navigate = useNavigate();

    let token = localStorage.getItem("token");
    //create axios with token
    const axiosWithToken = axios.create({
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })

    const postNewArticle = async(article)=>{
        article.dateOfCreation = new Date();
        article.dateOfModification = new Date();
        article.articleId = Date.now();
        article.username = currentUser.username;
        article.comments = [];
        article.status = true;
        //make http post request
        let res = await axiosWithToken.post("http://localhost:4000/author-api/article",article);
        console.log(res)
        if(res.data.message === "New article created"){
            navigate(`/authorprofile/articles-by-author/${currentUser.username}`);
        }else{
            setErr(res.data.message);
        }
    };

  return (
    <div>
        <div className='container mt-3 mb-3 d-block border border-dark m-auto w-50'>
            <h2 className='text-center mt-2'>Write an Article!</h2>
            <form onSubmit={handleSubmit(postNewArticle)}>
                <div className='p-3'>
                    <label htmlFor='title' className='form-label fs-4'>Title</label>
                    <input type="text" className='form-control' id='title' {...register("title")}/>
                </div>

                <div className='p-3'>
                    <label htmlFor='category' className='form-label fs-4'>Select a Category</label>
                    <select className='form-select' defaultValue="" {...register("category")}>
                        <option value="" disabled >Choose an option</option>
                        <option value='programming'>Programming</option>
                        <option value='skills'>Skills</option>
                        <option value='knowledge'>Knowledge</option>

                    </select>
                </div>

                <div className='p-3'>
                    <label htmlFor='content' className='form-label fs-4'>Content</label>
                    <textarea className='form-control' id='content' rows="10" {...register("content")}></textarea>
                </div>

                <div className='mb-1 p-2 d-flex justify-content-end'>
                    <button type='submit' className='btn btn-success m-3'>Add</button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default AddArticle
