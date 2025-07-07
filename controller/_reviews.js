const review_Listing = require("../models/reviews");
const car_Listing = require("../models/car");

const create_review = async(req,res)=>{
        const {id} = req.params;
        const rev = req.body.review;
        console.log(rev);

        const new_review = new review_Listing(rev);
         new_review.author = res.locals.current_user._id;
        await new_review.save();
        await car_Listing.findByIdAndUpdate(id , {$push : {reviews : new_review._id}});
        req.flash("success" , "comment is saved");
        res.redirect(`/listing/${id}`);
}

const destroy_review  =  async(req,res)=>{
        const {id ,rev_id} = req.params;
        const rev = await review_Listing.findById(rev_id).populate("author");
        await review_Listing.findByIdAndDelete(rev_id);
        await car_Listing.findByIdAndUpdate(id , {$pull :{reviews : rev_id}});
         req.flash("success" , "comment is deleted");
         res.redirect(`/listing/${id}`);
}

module.exports = {create_review , destroy_review};