const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/car.js");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/rewheels');
}
main().then(res=> console.log("connected to database")).catch(err => console.log(err));

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}

initDB();