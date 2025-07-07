const express = require("express");
const { route } = require("./listing_");
const router = express.Router({mergeParams : true});
const asyncWrap = require("../utils/wrapClass");
const {redirect} = require("../middleware");
const passport = require("passport");
const {login_get , login_post , signup_get , signup_post , logout} = require("../controller/_user");
router.route("/login")
.get(  asyncWrap(login_get))
.post(
    redirect,
    passport.authenticate("local",
        {
            failureRedirect : "/login",
            failureFlash : true
        }
    ),
    login_post
);
router.route("/signup")
.get(  asyncWrap(signup_get))
.post(  asyncWrap(signup_post));


router.get("/logout" , asyncWrap(logout));


module.exports = router;