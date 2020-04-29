const mongoose=require('mongoose')

const taskschema=new mongoose.Schema({
    
    // first field name and its validation
    description:{
        type:String,
        validate(value){
            if(value.length < 12)
                throw new Error('length of string is not provided')       
        }
    },
    // second field name and its validation
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
       type: mongoose.Schema.Types.ObjectId,
       required:true,
    //    here ref means refernce to other model (collection)
       ref:'Users'
    }
},{
    timestamps:true
})

// this help to craete a user model for validation of data "Users" databse name
const task=mongoose.model('Task',taskschema)

module.exports=task