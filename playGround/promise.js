require('../src/db/mongoose')
const User=require('../src/models/user')
const Task=require('../src/models/task')


// User.findByIdAndUpdate('5ea49ec0da0a5b536ce3a13d',{age:21}).then((result)=>{
// console.log(result)
// return User.countDocuments({age:21})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


// Task.findByIdAndDelete("5ea55b2ea6278a5b00c51b88").then((result)=>{
//     console.log("hero")
//     return Task.countDocuments()
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log("error")
// })

const updatecount=async(_id,age)=>{
    const user=await User.findByIdAndUpdate(_id,{age})
    const count=await User.countDocuments({age:21})
    return count;
}

updatecount('5ea49ec0da0a5b536ce3a13d',21).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error);
})