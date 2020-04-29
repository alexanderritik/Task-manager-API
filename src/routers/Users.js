const express=require('express')
const auth=require('../middleware/auth')
const multer=require('multer')

const sharp=require('sharp')

const welcomeEamil=require('../emails/account')

const router=new express.Router();

// moonge for user validating data and connect
const User=require('../models/user')

router.post('/users',async (req,res)=>{
    // console.log(req.body)
    //here we re.body conatains object which is passed by client  here we send to user.js for validator of data
    // and connect the databases
        const user=new User(req.body)
     
        try 
        {
            // here we save the the valuated data in mongo database
            await user.save()
            const token=await user.genrateAuthtoken();
            console.log(token)

            welcomeEamil.sendWelcomeEmail(user.name,user.email)

            res.status(201).send({user ,token});

        }catch(e){
            res.status(404).send(e);
        }
    
    
        //  it is old synatx without async await
        // // here we save the the valuated data in mongo database
        // user.save().then((result)=>{
        //     console.log('sucessful')
        //     res.status(200)
        //     res.send(result)
        // }).catch((error)=>{
        //     console.log('error')
        //     res.status(400)
        //     res.send(error)
        // })
    })
    
    
// to run middleware in the router we need third function before calling its route work 
router.get('/users/me', auth ,async (req,res)=>{

    res.status(200).send(req.user)


})


// for logout from that instance
router.post('/users/logout',auth,async(req,res)=>{

    // we are bring req.user and req.token from auth.js

    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !=req.token
        })

        await req.user.save();
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

// for logout all
router.post('/users/logoutAll',auth,async(req,res)=>{

    // we are bring req.user and req.token from auth.js

    try {
        req.user.tokens=[]
        await req.user.save();
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})





// patch request in http means updating a 
router.patch('/users/me',auth,async (req,res)=>{
    
    // if we send an key  which is invalid it must not accept date
    // if user updtae any other option it will so error
    const updates=Object.keys(req.body)
    const allowedOperation=["name","age","email","password"]
    // id any extra opeartion update return back error
    const validoperation=updates.every((update)=> allowedOperation.includes(update))
    
    if(!validoperation){
        return res.status(404).send({error:"invalid operation"}); 
    }

    // let _id=req.user.id;
    // console.log(_id)
    // console.log(req.body)
    try {

        
        // so we need to update that function
        updates.forEach((update)=>{  
            // console.log(update)
            req.user[update]=req.body[update] })

        console.log(req.user)

        await req.user.save()

        // this above adjustment made middleware function working

        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }

})
    
    
router.delete('/users/me',auth,async (req,res)=>{
    
    try {

        welcomeEamil.sendWelcomeEmail(req.user.name,req.user.email,'is there which I can improve it')

        // to remove that user
        await req.user.remove()
        //  but we need to "remove" all the task related to it so we called middleware
       
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
    
})


router.post('/users/login',async (req,res)=>{
    
    try {
        const user=await User.findCredentional(req.body.email, req.body.password)
        // since token work on instances so we send "user"as instance and not complete database document
        const token=await user.genrateAuthtoken()

        //  console.log(user)
        //  console.log(token)
        if(!user)
            res.status(400).send({message:"Unable to login"})
           
        res.status(200).send({user, token})
    } catch (e) {
        res.status(500).send({error:"Wrong authentication"});
    }
})


// this is the upload folder path and option
const upload=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            //  this will trow error when middleware fail 
            return cb(new Error ('please uplaod a jpg jpeg or png'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    
    const buffer=await sharp(req.file.buffer).resize({width:250 ,height:250}).png().toBuffer()
    
    req.user.avatar=buffer

    await req.user.save()

res.send({message:"succesful"})
},//this will run when router throw an error by middleware
(error,req,res,next)=>{
    res.send({error:error.message})
}
)


router.delete('/users/me/avatar',auth,async(req,res)=>{
    
     req.user.avatar=undefined
     await req.user.save()
    res.send({message:"successful"})
})


router.get('/users/:id/avatar',async(req,res)=>{
console.log(req.params.id)
    try {
        const user=await User.findById({_id:req.params.id})
        
        if(!user || !user.avatar)
             throw new  Error('not found')
        
             
        res.set('Content-Type','image/png')
        // console.log(user.avatar)
        res.send(user.avatar)   
    } catch (e) {
        res.status(404).send({error:"not found"})
    }
  
})


// it help to send all router function with single name
module.exports=router;