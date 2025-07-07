const mongoose = require("mongoose");
const carDetails = require("./carDetails");
const review = require("./reviews");

const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  year: Number,
  // image: {
  //   type: String,
  //   default: "https://plus.unsplash.com/premium_vector-1716902818196-884a74896d54",
  //   set: (v) => v === "" ? "https://plus.unsplash.com/premium_vector-1716902818196-884a74896d54" : v
  // },
  image : {
    filename : String,
    url : String
  },
  description: String,
  km_driven: Number,
  present_price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  carDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarDetail"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

// Fix typo in post middleware
carSchema.post("findOneAndDelete", async (data) => {
  if (data) {
    await review.deleteMany({ _id: { $in: data.reviews } });
    await carDetails.findByIdAndDelete(data.carDetails);
  }
});

module.exports = mongoose.model("Car", carSchema);
