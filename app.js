require('dotenv').config();
console.log(process.env.text);
const express = require('express');
const app = express();
const ejsmate = require('ejs-mate');
const path = require('path');
const car_Listing = require("./models/car");
const carDetail_listing = require("./models/carDetails");
const review_Listing = require("./models/reviews");
const mongoose = require('mongoose');
// const { read } = require('fs');
const methodeOverRiding = require("method-override");
const listingSchema = require("./schema_joi");
const ExpressError = require("./utils/ExpressError");
const {validateListing} = require("./middleware");
const {islogged}= require("./middleware");
const {redirect} = require("./middleware");
const asyncWrap = require("./utils/wrapClass"); 
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy  = require("passport-local");
const User = require("./models/user");
const listing_router = require("./router/listing_");
const user_router = require("./router/user_");
const review_router = require("./router/review_");
const mlpredict_route = require('./router/mlpredict');



app.use(session({
    secret : "raj2154",
    resave : false,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy (User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());
app.use((req,res , next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.current_user = req.user;
     next();
});
 

 async function main(){
     await mongoose.connect(process.env.MONGODB_URI);
 }

 main().then(()=>console.log("connected to database")).catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname,"views"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodeOverRiding('_method'));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});
app.use((req,res,next)=>{
    console.log("user => ",req.user);
    next();
})

 

 app.use("/listing" ,listing_router );
app.use("/" , user_router);
app.use("/listing/:id/review" ,review_router);
app.use(express.json());         // ✅ Must be above
app.use('/api', mlpredict_route); // 👈 Your prediction route

 
app.all("*" , (req,res , next)=>{
   next(new ExpressError(404 , "page is not found"));
});
const multer = require('multer');

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("🛑 Multer Error:", err);
    return res.status(400).render("listings/error.ejs", {
      status: 400,
      message: "File upload error: " + err.message
    });
  }

  console.log("🔥 FULL ERROR:", err); // this is important!
  const { status = 500, message = "something is off" } = err;
  res.status(status).render("listings/error.ejs", { status, message });
});

 



app.listen(2154 , ()=>{
    console.log('Server is running on port 2154');
});