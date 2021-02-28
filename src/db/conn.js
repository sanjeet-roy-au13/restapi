const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/userRegistration", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection Sucessfull`)
}).catch((err)=>{
    console.log(`error in connection ${err}`)
})