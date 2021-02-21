const express=require("express");
require("../src/db/conn");
const MensRanking=require("../src/models/mens")
const app = express()
const port=process.env.PORT || 3000;

app.use(express.json());


app.get("/",(req,res)=>{
    res.json({
    name:"THIS IS HOME.....welcome from sanjeet"
    });
   
})

app.post("/mens",async(req,res)=>{
    try {
        const addingMensRecords =new MensRanking(req.body)
        console.log(req.body)

        const insertMens = await addingMensRecords.save();
        res.status(201).send(insertMens)
        
    } catch (error) {
        res.status(400).send(error)
        
}

})
app.get("/mens",async(req,res)=>{
    try {
        const getMens =await MensRanking.find().sort({"ranking":1});
        res.send(getMens)

        const insertMens = await addingMensRecords.save();
        res.status(201).send(insertMens)
        
    } catch (error) {
        res.status(400).send(error)
    }
})


//to find perticular person by id
app.get("/mens/:id",async(req,res)=>{
    try {
        const _id=req.params.id;
        const getMen =await MensRanking.findById({_id})
        res.send(getMen)

        const insertMens = await addingMensRecords.save();
        res.status(201).send(insertMens)
        
    } catch (error) {
        res.status(400).send(error)

}

})

app.patch("/mens/:id",async(req,res)=>{
    try {
        const _id=req.params.id;
        const getMen =await MensRanking.findByIdAndUpdate(_id,req.body,{new:true})
        res.send(getMen)

        const insertMens = await addingMensRecords.save();
        res.send(insertMens)
        
    } catch (error) {
        res.status(500).send(error)

}

})

app.delete("/mens/:id",async(req,res)=>{
    try {
        const _id=req.params.id;
        const getMen =await MensRanking.findByIdAndDelete(_id)
        res.send(getMen)

        const insertMens = await addingMensRecords.save();
        res.send(insertMens)
        
    } catch (error) {
        res.status(500).send(error)

}

})

app.listen(port,()=>{
    console.log(`listening to port no ${port}`)

})

