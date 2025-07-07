const express = require("express");
const router = express.Router({mergeParams : true});
const {listing_get , listing_post , listing_show_get , edit_get , edit_put , destory  , createList } = require("../controller/_listing");
const { islogged , validateListing, userValidation } = require("../middleware");
const asyncWrap = require("../utils/wrapClass");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({  storage });



router.get("/new" , islogged ,  createList);

router.route("/")
.get( asyncWrap ( listing_get))
.post(islogged,(req,res,next)=>{console.log("before upload"); next();}, upload.single('car[image]'), validateListing, asyncWrap(listing_post));

 


router.route("/:id")
.get( asyncWrap ( listing_show_get))
.put( islogged,asyncWrap( edit_put))
.delete( islogged ,userValidation, asyncWrap( destory));

router.get("/:id/edit" ,islogged ,userValidation,asyncWrap( edit_get));


module.exports = router;