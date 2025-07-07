
const User = require("../models/user");

const login_get = async(req,res)=>{
    res.render("authentication/login");
}
const login_post = (req ,res)=>{
        console.log("im before the redirect post login")
        req.flash("success" , "welcome back");

        const redirectUrl = res.locals.redirectUrl;
        delete req.session.redirectUrl;
         res.redirect(redirectUrl);
}

const signup_get = async(req,res)=>{
    res.render("authentication/signup");
}
const  signup_post = async (req, res, next) => {
 
    const { username, email, password, license, aadhar } = req.body;
    const newUser = new User({ username, email, license, aadhar });
    const registeredUser = await User.register(newUser, password);

    console.log("im before the req.login");

    req.login(registeredUser, (err) => {
      if (err) {
        console.error("Error in req.login callback:", err);
        return next(err);
      }
      console.log("im inside req.login callback, before redirect");
      req.flash("success", "welcome");
      
      res.redirect("/listing");
    });

}
const logout = async(req,res , next)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err);
            return next(err);
        }
        req.flash("success" , "successfully logged out");
        res.redirect("/listing");
    })
}

module.exports = {login_get , login_post , signup_get , signup_post , logout};