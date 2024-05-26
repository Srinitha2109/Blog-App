import React from 'react'
import {axiosWithToken} from '../axiosWithToken'
import {useLocation} from 'react-router-dom'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import {useForm} from "react-hook-form"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
// import { FcComments, FcPortraitMode } from "react-icons/fc";
import { MdRestore } from "react-icons/md";

function Article() {

  let {state} = useLocation();

  let navigate = useNavigate();
  let {currentUser} = useSelector(
    (state) => state.userAuthorLoginReducer);

  let {register,handleSubmit} = useForm();
  let [comment,setComment] = useState('');
  let [articleEditStatus,setArticleEditStatus] = useState(false);
  let [currentArticle,setCurrentArticle] = useState(state);


  const deleteArticle = async() => {
    let art={...currentArticle};
    delete art._id;
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
    if(res.data.message==='article deleted'){
      setCurrentArticle({...currentArticle,status:res.data.payload})
    }
  };

  
  const restoreArticle =async () => {
    let art={...currentArticle};
    delete art._id;
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
    if(res.data.message==='article restored'){
      setCurrentArticle({...currentArticle,status:res.data.payload})
    }
  };


  //add comment to an article by user 
  const writeComment = async(commentObj)=>{
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,commentObj)
    if(res.data.message ==='comment written'){
      setComment(res.data.message);
    }
  }

  //enable edit state
  const enableEditState=()=>{
    setArticleEditStatus(true);
  }
  
  //disable edit state
  const saveModifiedArticle=async(editedArticle)=>{
    let modifiedArticle={...state,...editedArticle}
    //change date of modification
    modifiedArticle.dateOfModification = new Date();
    //remove _id
    delete modifiedArticle._id;
    //send modified article to backend
    let res = await axiosWithToken.put(`http://localhost:4000/author-api/article`,modifiedArticle);

    if(res.data.message ==='Article modified'){
      setArticleEditStatus(false);
      navigate(`/authorprofile/article/${modifiedArticle.articleId}`,{state:res.data.article})
    }  
  }

  const addCommentByUser = async (commonObj)=>{
    console.log(commonObj)
  };

  return (
    <div className='ms-2'>
      {
        articleEditStatus===false?<>
         <div className='d-flex justify-content-between'>
        <div>
          <p className='display-3 me-4'>{state.title}</p>
          <span className='py-3'>
            <small className='text-secondary'>
              <FcCalendar className='fs-4'/>
              Created on: {state.dateOfCreation} </small>
            <small className='text-secondary '>
              <FcClock className='fs-4'/>
              Modified on: {state.dateOfModification}</small>
          </span>
        </div>
        <div>
        {currentUser.userType === "author" && (
                <>
                 
                  <button
                    className="me-2 btn btn-warning "
                    onClick={enableEditState}
                  >
                    <CiEdit className="fs-2" />
                  </button>
                  {currentArticle.status === true ? (
                    <button
                      className="me-2 btn btn-danger"
                      onClick={deleteArticle}
                    >
                      <MdDelete className="fs-2" />
                    </button>
                  ) : (
                    <button
                      className="me-2 btn btn-info"
                      onClick={restoreArticle}
                    >
                      <MdRestore className="fs-2" />
                    </button>
                  )}
                </>
          )}
        </div>
      </div>
      <p className='lead mt-3' style={{whiteSpace: "pre-line"}}>{state.content}</p>
      {/* user comment*/}

        <div>
            {/*read existing comments */}
            <div className='comments my-4'>
              {state.comments.length===0?(
                <p className='display-4'>No Comments yet...</p>
              ):(
                state.comments.map((commentObj,ind)=>{
                  return(
                    <div key={ind} className='bg-light'>
                      <p className='fs-4'>
                        {/* <FcPortraitMode className='fs-2 me-2'/> */}
                        {commentObj.username}</p>

                      <p >
                        {/* <FcComments className="me-2"/> */}
                        {commentObj.comment}
                      </p>
                      </div>
                  )
                  
                })
              )}
            </div>
          <h1>{comment}</h1>
          {currentUser.userType === "user" && (
            <form onSubmit={handleSubmit(writeComment)}>
              <input type="text" className='w-100' {...register("comment")} placeholder="Write your comment here...."/>
              <div className='mt-3'>
              <button type="submit"  className='btn btn-success ms-2 p-2 my-2 mb-2'>Add comment</button>
              </div>
            </form>
          )}
        
        </div>
        </>:
        <form onSubmit={handleSubmit(saveModifiedArticle)}>
        <div className='p-3'>
            <label htmlFor='title' className='form-label fs-4'>Title</label>
            <input type="text" className='form-control' id='title' {...register("title")} defaultValue={state.title}/>
        </div>

        <div className='p-3'>
            <label htmlFor='category' className='form-label fs-4'>Select a Category</label>
            <select className='form-select' id='category'{...register("category")} defaultValue={state.category}>
                <option value="" disabled >Choose an option</option>
                <option value='programming'>Programming</option>
                <option value='skills'>Skills</option>
                <option value='knowledge'>Knowledge</option>

            </select>
        </div>

        <div className='p-3'>
            <label htmlFor='content' className='form-label fs-4'>Content</label>
            <textarea className='form-control' id='content' rows="10" {...register("content")} defaultValue={state.content}></textarea>
        </div>

        <div className='mb-1 p-2 d-flex justify-content-end'>
            <button type='submit' className='btn btn-success m-3'>Save</button>
        </div>
        
    </form>
      }
     
    </div>
  
  )
}

export default Article