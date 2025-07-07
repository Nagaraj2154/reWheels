const car_Listing = require("../models/car");
const carDetail_listing = require("../models/carDetails");
const {listingSchema} = require("../schema_joi");
// console.log("listingSchema =", listingSchema.validate);


const listing_get = async(req,res)=>{
    const car = await car_Listing.find().populate("carDetails").populate("owner");
    res.render("listings/All_listings.ejs" , {car});
}
const createList = (req,res)=>{

    res.render("listings/new");
}

const axios = require("axios");

const listing_post = async (req, res) => {
  console.log("🚀 FORM DATA:", req.body);
console.log("🖼️ FILE DATA:", req.file);

  const { error, value } = listingSchema.validate(req.body);

  if (error) {
    req.flash("error", error.details[0].message);
    return res.redirect("/listing/new");
  }


  const { car, carDetail } = value;
  let url = req.file.path;
  let filename = req.file.filename;




  try {
    // 1. Save car details first (required for model input)
    const newCarDetail = new carDetail_listing(carDetail);
    // await newCarDetail.save();

    // 2. Prepare data for prediction (based on carDetail + car form)
    const predictionInput = {
      year: car.year,
      km_driven: car.km_driven,
      present_price: car.present_price/100000, // you must include this in your form
      fuel_type: carDetail.fuel_type,
      seller_type: carDetail.seller_type,
      transmission: carDetail.transmission,
      owner: carDetail.owner,
      service_cost: carDetail.service_cost/100000,
      modifications: carDetail.modifications,
      accidents: carDetail.accidents,
      insurance_valid: carDetail.insurance_valid,
      service_history: carDetail.service_history,
    };

    // 3. Call the ML Flask API
    const predictionResponse = await axios.post(
      process.env.PREDICTION_API_URI ,
      predictionInput,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const predictedPrice = predictionResponse.data.predicted_price_lakhs;
    newCarDetail.predicted_price = predictedPrice; // save predicted price in carDetail
    await newCarDetail.save(); // save car details with predicted price

    // 4. Save final car listing
    const newCar = new car_Listing({
      ...car,
      owner: req.user._id,
      carDetails: newCarDetail._id
       
      // predicted_price: predictedPrice, // ✅ save predicted price
    });
    newCar.image = { url: url, filename: filename };
  

    await newCar.save();

    req.flash("success", "Car listed successfully with predicted price!");
    res.redirect("/listing");
  } catch (err) {
    console.error("❌ Listing error:", err.message);
    req.flash("error", "Error predicting price or saving listing.");
    res.redirect("/listing/new");
  }
};

const listing_show_get = async(req,res)=>{
    const {id} = req.params;
    const list = await car_Listing.findById(id).populate("carDetails").populate("owner").populate({path : "reviews" , populate : "author"});
    if(!list){
        req.flash("error" , "not found");
        res.redirect("/listing");
    }
    console.log(list.owner._id);
    
    res.render("listings/show" , {data : list});
}

const edit_get = async(req,res)=>{
    
    const {id} = req.params;
    console.log("in edit");
    const list = await car_Listing.findById(id).populate("carDetails").populate("owner");

    res.render("listings/edit" , {data : list});
}

 

const edit_put = async (req, res) => {
  try {
     let url = req.file.path;
  let filename = req.file.filename;
    const car = req.body.car;
    const carDetail = req.body.carDetail;
    
    const { id } = req.params;

    const list = await car_Listing.findById(id).populate("carDetails").populate("owner");
    
    const CD_id = list.carDetails._id;

    // Step 1: Prepare data for prediction
    const predictionInput = {
      year: parseInt(car.year),
      km_driven: parseFloat(car.km_driven),
      present_price: parseFloat(car.present_price)/100000,
      fuel_type: carDetail.fuel_type,
      seller_type: carDetail.seller_type,
      transmission: carDetail.transmission,
      owner: carDetail.owner,
      service_cost: parseFloat(carDetail.service_cost)/100000,
      modifications: carDetail.modifications,
      accidents: carDetail.accidents,
      insurance_valid: carDetail.insurance_valid,
      service_history: carDetail.service_history
    };

    // Step 2: Call ML API
    const response = await axios.post(process.env.PREDICTION_API_URI , predictionInput);
    const predicted_price = response.data.predicted_price_lakhs;
      const image = {
        uri ,
        filename
      };
      // car.present_price = parseFloat(car.present_price)/100000; // convert to lakhs
      // carDetail.service_cost = parseFloat(carDetail.service_cost)/100000; // convert to lakhs

    // Step 3: Update car and carDetail with prediction
    await car_Listing.findByIdAndUpdate(id, { ...car , image  }, { new: true });
    await carDetail_listing.findByIdAndUpdate(
      CD_id,
      { ...carDetail, predicted_price },
      { new: true }
    );

    req.flash("success", "Data is updated successfully");
    res.redirect(`/listing/${id}`);
  } catch (err) {
    console.error("❌ Error updating car listing:", err);
    req.flash("error", "Something went wrong during update");
    res.redirect("/listing");
  }
};


const destory = async(req,res)=>{
  console.log("im in destory");
     
    const {id} = req.params;
   
    
   const deleted= await car_Listing.findByIdAndDelete(id);
   if(!deleted){
    req.flash("error" , "invalid request")
   }
   else{
    req.flash("error" , "data is destoryed successfully");
   }

    res.redirect("/listing");
   
    

}    

module.exports = {listing_get , listing_post , listing_show_get , edit_get , edit_put , destory  , createList};