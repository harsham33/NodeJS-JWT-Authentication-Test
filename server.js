<<<<<<< HEAD
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require('express-jwt');

const app = express();
const PORT = 3000;

// Middleware for CORS and headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    next();
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Secret key for JWT signing
const secretKey = "MySecretKey";

// JWT middleware for protected routes
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1]; // Extract token from Bearer <token>
        }
        return null; // Return null if no token is found
    }
});

// Dummy users data
let users = [
    { id: 1, username: 'harsha', password: '123' },
    { id: 2, username: 'mulge', password: '456' }
];

// Protected route for dashboard
app.get("/api/dashboard", jwtMW, (req, res) => {
    console.log("Authorization header:", req.headers.authorization);
    res.json({
        success: true,
        myContent: "Secret Content that only logged in people can view"
    });
});

// Protected route for settings
app.get('/api/settings', jwtMW, (req, res) => {
    console.log("Authorization header:", req.headers.authorization);
    res.json({
        success: true,
        myContent: 'Settings page working!'
    });
});

// Route for login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    let token;
    for (let user of users) {
        if (username === user.username && password === user.password) {
            token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '180s' });
=======
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
})
const jwt = require('jsonwebtoken')
const { expressjwt: exjwt } = require('express-jwt');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const secretKey = "My Secret Key";
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256'],
});

let users = [
    {
        id:1,
        username:'sai',
        password:'123'
    },
    {
        id:2,
        username:'keerthan',
        password:'456'
    }
]

app.get("/api/dashboard", jwtMW, (req,res)=>{
    console.log(req);
    res.json({
        success:true,
        myContent:"Secret Content that only logged in people can view"
    })
})


app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})

app.use((err,req,res,next)=>{
    console.log(err.name==='UnauthorizedError');
    console.log(err);
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({
            success:false,
            officialErr: err,
            err:"Username or password is incorrect 2"
        })
    }
    else{
        next(err);
    }
});

app.post("/api/login", (req,res)=>{
    const {username, password} = req.body;
    let token;
    for(let user of users){
        if(username == user.username && password==user.password){
            token = jwt.sign({id:user.id,username:user.username}, secretKey, {expiresIn:'180s'})
>>>>>>> c1c44bc (Completed instructions)
            break;
        }
    }
    if (token) {
        res.json({
            success: true,
            err: null,
            token
        });
<<<<<<< HEAD
    } else {
=======
    }
    else {
>>>>>>> c1c44bc (Completed instructions)
        res.status(401).json({
            success: false,
            token: null,
            err: 'Username or password is incorrect'
        });
    }
<<<<<<< HEAD
});

// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Error handling middleware for JWT errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log("UnauthorizedError details:", err);
        res.status(401).json({
            success: false,
            message: "Unauthorized access, invalid or expired token."
        });
    } else {
        next(err);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`);
});
=======

})

app.get('/api/settings', jwtMW, (req, res) => {
    res.json({
        success: true,
        myContent: 'Settings page working!'
    });
});

app.listen(PORT, ()=>{
    console.log(`Serving on port ${PORT}`); 
})
>>>>>>> c1c44bc (Completed instructions)
