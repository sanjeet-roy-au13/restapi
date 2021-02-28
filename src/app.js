const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");
const { log } = require("console");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );
const app_static = path.join(__dirname, "../src" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(app_static));
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) =>{
    res.render("register");
})

app.get("/login", (req, res) =>{
    res.render("login");
})

// create a new user in our database
app.post("/register", async (req, res) =>{
    try {

      const password = req.body.password;
      const cpassword = req.body.confirmpassword;

      if(password === cpassword){
        
        const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                address:req.body.address,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                    
        })

        console.log("the success part" + registerEmployee);

        const token = await registerEmployee.generateAuthToken();
        console.log("the token part" + token);

        const registered = await registerEmployee.save();
        console.log("the page part" + registered);

        res.status(201).render("index");

      }else{
          res.send("password are not matching")
      }
        
    } catch (error) {
        res.status(400).send(error);
        console.log("the error part page ");
    }
})


// login check

app.post("/login", async(req, res) =>{
   try {
    
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});

        const isMatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        console.log("the token part" + token);
       
        if(isMatch){
            res.status(201).render("tasks");
            
        }else{
           res.send("invalid Password Details"); 
        }
    
   } catch (error) {
       res.status(400).send("invalid login Details")
   }
})

app.patch("/login/:id",async(req,res)=>{
    try {
        const _id=req.params.id;
        const update =await Register.findByIdAndUpdate(_id,req.body,{new:true})
        res.send(update)

        const upDateUser = await  registerEmployee.save();
        res.send(upDateUser)
        
    } catch (error) {
        res.status(500).send(error)

}

})
app.post("/login/task",async(req,res)=>{
    try {
        const confirm = req.body.confirm;
        const userconfirm = await Register.findOne({email:confirm});
        const work=await Register.updateOne({Tasks:userconfirm.Tasks},{Tasks:req.body.task})
        res.send(work)
        const upTask = await registerEmployee.save();
        res.send(upTask)

    } catch (error) {
        res.status(500).send(error)

}

})








app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})

