const express=require('express')
const auth=require('../middleware/auth')
const router=new express.Router();

// moonge for user validating data and connect
const Task=require('../models/task')
const User=require('../models/user')


// // for fetching all task so if the database is big it can make app slow
// get/tasks?completed=true
// get/tasks?limit=2
// get/tasks?limit=2&skip=2
// get/tasks?sort=createdAt:asec or desc
router.get('/tasks',auth,async(req,res)=>{  
    const match={}
    const sort={}
    if(req.query.completed)
        match.completed=req.query.completed==='true'

    if(req.query.sort)
    {
        const part=req.query.sort.split(':')
        sort[part[0]]=part[1]==='asc'?-1:1;
    }

    try{
    await req.user.populate({
        path:'tasks',//it is virtual function decalred user model
        match:match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
    }).execPopulate()
    // console.log(req.user.tasks)
        res.status(200).send(req.user.tasks)
    }catch(e){
        res.status(505).send(e)
    }

    // Task.find({}).then((result)=>{
    //     console.log(result)

    //     res.send(result)
    // }).catch((error)=>{
    //     res.status(500)
    //     console.log(error)
    // })
})

// // here we request to submit a task
router.post('/tasks',auth,async(req,res)=>{
    console.log(req.body)

    const task=new Task({
        ...req.body,//it means we copy all req body to task and adding some more
        owner:req.user._id
    })

    console.log(task)

        try{
            await task.save();
            res.status(200).send(task)
        }catch(e){
            res.status(505).send(e)
        }

    // task.save().then((result)=>{
    //     res.send(result)
    //     console.log('succesful')
    // }).catch((error)=>{
    //     console.log('error')
    //     res.status(400)
    //     res.send(error)       
    // })
})

// // here we call the id of task
router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id;
console.log("hello")
        try{
      
            const task=await Task.findOne({_id,owner:req.user._id})

            if(!task)
                res.status(404).send({ error:"Not found any task"})    
            res.status(200).send(task)
        }catch(e){
           console.log(e) 
        }


        // Task.findById({_id}).then((result)=>{
        //     console.log(result)    
        // if(!result)
        // res.status(500).send({ error:"Not found any result"})

        // res.status(200).send(result)
        // }).catch((error)=>{
        // res.status(404).send({"error":"No result"})
        // // console.log("error")
        // })
})


router.patch('/tasks/:id',auth,async (req,res)=>{
    
    // if we send an key  which is invalid it must not accept date
    // if user updtae any other option it will so error
    const updates=Object.keys(req.body)
    const allowedOperation=["description","completed"]
    // id any extra opeartion update return back error
    const validoperation=updates.every((update)=> allowedOperation.includes(update))
    
    if(!validoperation){
       return res.status(404).send({"error":"invalid operation"}); 
    }
    let _id=req.params.id;

    console.log(_id)
    console.log(req.body)
    try {

        const task=await Task.findOne({_id , 'owner':req.user._id})

        if(!task)
            res.status(404).send()

        updates.forEach((update)=> task[update]=req.body[update])
        await task.save()

        res.status(200).send(task)
    } catch (e) {
        res.status(404).send(e)
    }

})


router.delete('/tasks/:id',auth,async (req,res)=>{
    
    try {
       const result= await Task.findOneAndDelete({_id:req.params.id , 'owner':req.user._id})
        if(!result)
            res.status(400).send({ message:"Not Task"})

        res.status(200).send({message:"Successful"})
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports=router