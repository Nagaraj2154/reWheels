
const {reviewSchema} = require("./schema_joi");
const {listingSchema} = require("./schema_joi");
const ExpressError = require("./utils/ExpressError");
const car_Listing = require("./models/car");
const review = require("./models/reviews");

const validateListing = (req, res, next) => {
  console.log("🚀 FORM DATA:", req.body);
console.log("🖼️ FILE DATA:", req.file);

  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    return next(new ExpressError(400, msg , "in validateListing middleware"));
  }
  next();
};

const islogged = (req,res,next)=>{
  console.log(req.user);
  console.log("hi");
   if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "need login.....");
       return res.redirect("/login");
    }
  next();
}
const redirect = (req,res,next)=>{
  const url = req.session.redirectUrl || "/listing";
  res.locals.redirectUrl = url;
  next();
}
const userValidation = async (req, res, next) => {
  const { id } = req.params;
  const list = await car_Listing.findById(id).populate("owner");

  if (!list) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listing");
  }
    console.log("user___",list.owner._id);
    console.log("current_user___",res.locals.current_user);
    if (list.owner._id.equals(res.locals.current_user._id)) {
      console.log("user is same");
    }
   
  if (!list.owner._id.equals(res.locals.current_user._id)) {
    req.flash("error", "You are not authorized to edit this listing fucker.");
    return res.redirect(`/listing/${id}`);
  }

  next();
};

const reviewValidation =  (req,res ,next)=>
{
  console.log(req.body);
    const result = reviewSchema.validate(req.body.review);
    if(result.error){
        
        return next(new ExpressError(400 ,  result.error.details[0].message ));

    }

    next();
};

const review_del_validation = async (req, res, next) => {
  const { id, rev_id } = req.params;
  const rev = await review.findById(rev_id).populate("author");

  if (!rev) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listing/${id}`);
  }

  if (!req.user || !rev.author._id.equals(req.user._id)) {
    req.flash("error", "You are not the actual owner of this review.");
    return res.redirect(`/listing/${id}`);
  }

  next();
};
 

module.exports = {validateListing , islogged , redirect , userValidation , reviewValidation , review_del_validation};
