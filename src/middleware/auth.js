const jwt=require('jsonwebtoken')
const User=require('../models/user')

const auth=async(req,res,next)=>{
console.log("we are in auth")

try {
    const token=req.header('Authorization').replace('Bearer ','')
    const  decode=jwt.verify(token,'secretkey')
    // console.log(token)
    // console.log(decode)
    // it print decode deatil which we sent when we are creating one 

    const user=await User.findOne({_id:decode._id , 'tokens.token':token})
    // console.log(user)

    if(!user)
        throw new error
    
    //by doing this we are creating an instance of that variable and save time  
    // we can set any instance req.xyz
    req.user=user
    req.token=token
    // we can use anywhere  where it  is export

    next()

} catch (e) {
    res.status(401).send({error:"please Authenticate"})
}

}



module.exports=auth;