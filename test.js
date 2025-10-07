const express = require("express")
const app= express()
const port = 3000 //set up a port
const cors = require("cors") //and that will avoid any cors error

//middlewares and these replace the body parser package. 
//most express servers that we set up have this so its good

app.use(express.urlencoded({extended: true}))
app.use(express.json()) //extra functionality in rec.body
app.use(cors())

//we will create a route

app.get("/", cors(), async(req,res) => { 
    res.send("Hello this is the weather API!")
})
app.get("/something", cors(), async(req,res)=> {
    res.send("Here's the little something!")
})
//here req isn't exactly passed along. only the response is.

app.listen(port, ()=> {
    console.log("Listening at http://localhost:" + port)
})

