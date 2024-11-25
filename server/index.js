const express = require('express') 
const Route = require('./routes/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const port = 3001
const app = express()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
}))
app.use(Route)
app.use(cookieParser())

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.json({Error: "Error authenticate"})
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json({Error: "Error token"})
            }else{
                req.name = decoded.name
                next()
            }
        })
    }
}
app.get('/',verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name})
})


app.listen(port, ()=>{ console.log(`L'application est demarée sur le port ${port}`) })