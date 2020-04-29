const mongoose=require('mongoose')
const validator=require('validator')


// this is used to connect the server
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true
})



