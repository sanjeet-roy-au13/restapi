const mongoose=require ("mongoose");
mongoose.connect("mongodb+srv://admin:sanchit111...@cluster0.hgdc9.mongodb.net/Registration?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("As Promised connection establish")
})
.catch((err)=>{
    console.log(err,"error hogay ,sorry for not keeping Promise")
})
