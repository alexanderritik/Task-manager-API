const express=require('express')

// for running database
require('./db/mongoose')


const UserRouter=require('./routers/Users')
const TaskRouter=require('./routers/Tasks')
const app=express();

// for deploying on heroku
const port=process.env.PORT


// app.use((req,res,next)=>{
//     console.log(req.method)
//     // console.log(res)
//     if(req.method === 'GET')
//     {
//         res.send('no get request')
//     }
//     else
//     {
//         next();
//     }
// })






// without middleware : new request ->run route handler
// with middleware :new request -> do someting -> run route handler



// this is used to convert post json data as object of javascript
app.use(express.json()) 
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log('You connection is established')
})



// to make handler when your site under maintence
// app.use((req,res,next)=>{
//     res.status(503).send('Sorry for incovenince Service is temporarily shut down')
// })

