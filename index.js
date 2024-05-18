const express = require("express")
const app = express()
const ejs = require("ejs")
app.set("view engine", "ejs")
const mongoose = require("mongoose")
app.use(express.urlencoded({ extended: true }))
// let userarray = []

let userschema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String }
})

let usermodel = mongoose.model("user_collection", userschema)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/login", (req, res) => {
    res.render("login")
})


//  POST is to send data 
app.post("/login", (req, res) => {
    // console.log("login successfull");
    console.log(req.body);
    const { logemail, logpassword } = req.body
    let existuser = userarray.find(el => el.email == logemail)
    console.log(existuser);

    if (existuser && existuser.pass === logpassword) {
        console.log("login successful");
        redirect("/")
    } else {
        console.log("user does not exist");
    }
    // console.log(req.body.email);
    // console.log(req.body.password);
})

app.post('/register', async (req, res) => {
 const {email, password} = req.body
    try {
        if(!email || !password){
            console.log("All field must !mt");
        }else{
            const findUser = await usermodel.findOne({email})
            if (findUser) {
                console.log("email already exists ");  
            }else {
                console.log(req.body);
                let users = await usermodel.create(req.body)
                if (users) {
                    console.log("signedup successful");
                    res.redirect("/login")
                } else {
                    console.log("error occured while signing up");
                }

        }
      
        }

        // console.log(req.body);
        // let users = await usermodel.create(req.body)
        // if (users) {
        //     console.log("signedup successful");
        //     res.redirect("/login")
        // } else {
        //     console.log("error occured while signing up");
        // }
    } catch (error) {
        console.log(error);
    }


})


app.post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body
    let existuser = userarray.find(el => el.email == email)
    console.log(existuser);
    if (existuser &&
        existuser.Password === password) {
        console.log("login successful")
        res.redirect('/')
    } else {
        console.log("user does not exist")
    }

})

const uri = "mongodb+srv://Ambassador:Emmanuel224@cluster0.xzfo8n7.mongodb.net/Signup?retryWrites=true&w=majority&appName=Cluster0"


const connect = () => {
    try {
        const connection = mongoose.connect(uri)
        if (connection) {
            console.log("connected to database");
        } else {
            console.log("error occured");
        }
    } catch (error) {
        console.log(error);
    }

}

connect()

let port = 5001

app.listen(port, () => {
    console.log(`app started on port ${port}`);
})