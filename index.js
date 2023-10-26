const express=require("express");
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport")    
const User=require("./models/user")
const authRoutes=require("./routes/auth")
require("dotenv").config();
const app=express();
const port=3003;

app.use(express.json());

console.log(process.env)
mongoose
.connect(
    "mongodb+srv://ulabideenzain77:"+
    process.env.MONGO_PASSWORD+
"@cluster0.cx8nbbx.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true

}).then((x)=>{
 console.log("connected ha")
}).catch((err)=>{
    console.log("error while connecting to mongo");
});

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'zainulabideen';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/",(req,res)=>{
    res.send("hello world");
});
app.use("./auth",authRoutes);
app.listen(port,()=>{
    console.log("App is running on port  "+  port)
})
