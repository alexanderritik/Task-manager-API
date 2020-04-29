const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')



// for deleting multiple task
const Task=require('./task')

// here we are going to add middleware 
// middleawre means that we can call some function before and after that particular event by providing it under schema 

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // here trim remove extra space
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        // to make email unique for new user
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('email is wrong ordered') 
        }
        
    },
    age:{
        type:Number,
        default:0,
        // here we can provid an extra valitator option
        validate(value){
               if(value < 0)
               throw new Error('age cannot be negative') 
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},//here awawy from user model we pass a time stamp
{
    timestamps:true
})

// here we can set




// methids are applicable on instances
// it requres this so no arrow function
userschema.methods.genrateAuthtoken=async function(){
    const user=this
// console.log(user._id.toString())
    const token=jwt.sign({_id:user._id.toString()} , process.env.JWT_KEY,{ expiresIn:'7 days'})
    // console.log(token)
    // to save the token
    user.tokens=user.tokens.concat({token})
    await user.save();
    return token
}



// here toJSON is a function which is called every time when we call res.send() since it converts
// object in to json so we can edit thing which are sent by res.send() like removing password and token

// so when we call res.send() it call JSON.stringify

// this is done to reduce the load of heavay jsons
userschema.methods.toJSON=function(){
    const user=this

    const userobject=user.toObject()
    
    delete userobject.password
    delete userobject.tokens
    delete userobject.avatar

    return userobject
}


// here we set a virtual property which does not means it is databsae
// it is like a relationship between two entities
// it can be any name which we call 'task'
userschema.virtual('tasks',{
    ref:'Task',
    // it means it is relation shipbetween userid
    localField:'_id',
    // it means the task owner field 
    foreignField:'owner'
})



// when we perform something before the operation
// this function is call before "save" function
userschema.pre('save',async function(next){
    // here arrow function donot work since it does contains "this" inside it
    const user=this;
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password ,8)
    }
    // here next is callback function to middleware when the pre function execute
    next();
})


userschema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({'owner':user._id})
    next();
})



// statics are applicable on function on model 
userschema.statics.findCredentional=async (email,password)=>{
    const result=await User.findOne({email})
    
    if(!result)
        throw new Error ("unable to login")

    // console.log(password)
    // console.log(result.password)
    const isvalid=await bcrypt.compare(password,result.password)
    // console.log(isvalid)
    
    if(!isvalid)
        throw new Error ("unable to login")

    return result
}


// when we performing something after the operation
// userschema.post



// this help to craete a user model for validation of data "Users" databse name
const User=mongoose.model('Users',userschema)

module.exports=User;

