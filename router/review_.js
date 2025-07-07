const express = require("express");
const router = express.Router({mergeParams : true});
const asyncWrap = require("../utils/wrapClass");
const {create_review , destroy_review} = require("../controller/_reviews");
const {islogged , reviewValidation , review_del_validation} = require("../middleware");

router.post("/" ,islogged,reviewValidation, asyncWrap(create_review));

router.delete("/:rev_id" ,islogged,review_del_validation,asyncWrap( destroy_review));
 

module.exports = router;