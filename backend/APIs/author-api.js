//create author api app
const exp = require('express')
const authorApp = exp.Router();
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken = require('../Middlewares/verifyToken') 

let authorcollection;
let articlescollection;

//author-api routes
//get usercollection app
authorApp.use((req,res,next)=>{
    authorcollection=req.app.get('authorcollection')
    articlescollection = req.app.get('articlescollection')
    next()
})

//author registration route
authorApp.post('/user',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const newUser = req.body;
    //check for duplicate user based on username
    const dbuser = await authorcollection.findOne({username:newUser.username})
    //if user found in db
    if(dbuser!=null){
        res.send({message:'author existed'})
    }else{
        //hash password
        const hashedPassword = await bcryptjs.hash(newUser.password,6)
        //replace plain password with hashed password
        newUser.password = hashedPassword;
        //create user
        await authorcollection.insertOne(newUser)
        //sending res
        res.send({message:"Author created"})
    }
}))

//author login
authorApp.post('/login',async(req,res)=>{
    //get cred obj from client
    const userCred = req.body;
    //check username
    const dbuser = await authorcollection.findOne({username:userCred.username})
    if(dbuser===null){
        res.send({message:"invalid username"})
    }else{
        //check for password
        const status = await bcryptjs.compare(userCred.password,dbuser.password)
        if(status===false){
            res.send({message:"inavlid password"})
        }else{
            //create jwt token and encode
            const signedToken = jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            //send res
            res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
})


//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle = req.body;
    //post to article collection
    await articlescollection.insertOne(newArticle)
    //send res
    res.send({message:"New article created"})

}))

//modify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article
    const modifiedArticle = req.body;
    //update by article id
    let result = await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:modifiedArticle})
    let latestArticle = await articlescollection.findOne({articleId:modifiedArticle.articleId})
    //send res
    res.send({message:"Article modified",article:latestArticle})
}))


//delete an article by article ID
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=(+req.params.articleId);
    //get article 
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
       let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
   
   
}))


//read articles of author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get username of author's from url
    const authorName = req.params.username;

    const articlesList = await articlescollection.find({username:authorName}).toArray()
    res.send({message:"List of articles",payLoad:articlesList})
}))


//export userApp
module.exports=authorApp;
