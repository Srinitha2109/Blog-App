//create express app
const exp = require('express')
const app=exp()
require('dotenv').config()
//import mongoclient
const mongoClient = require('mongodb').MongoClient;
const path = require('path')

//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../frontend/build')))
//to parse body of req
app.use(exp.json())

//connect to DB
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const blogdb = client.db('blogdb')
    //get collection obj
    const usercollection = blogdb.collection('usercollection')
    const articlescollection = blogdb.collection('articlescollection')
    const authorcollection = blogdb.collection('authorcollection')

    //share collection obj with express app
    app.set('usercollection',usercollection)
    app.set('articlescollection',articlescollection)
    app.set('authorcollection',authorcollection)
    
    //confirm db connection status
    console.log('db connected')
})
.catch(err=>console.log('err in db connection',err))


//import API routes
const userApp = require('./APIs/user-api')
const authorApp = require('./APIs/author-api')
const adminApp = require('./APIs/admin-api')


//if path starts with user-api send req to userApp
app.use('/user-api',userApp)
//if path starts with author-api send req to authorApp
app.use('/author-api',authorApp)
//if path starts with admin-api send req to adminApp
app.use('./admin-api',adminApp)

//used for refresh of page
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payLoad:err.message})
})





//assign port number
const port = process.env.Port || 5000;
app.listen(4000,()=>console.log(`server is running on port ${port}`))
