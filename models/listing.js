const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abhiraj33181:3IXBooqm3OqosCpp@listing.xecdd8i.mongodb.net/wonderlust")
.then(()=>{
    console.log("Connected to DB")
})
.catch((err)=>{
    console.log(err)
})

const listingSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : "https://ihplb.b-cdn.net/wp-content/uploads/2021/11/eifel-tower-736x430.jpg",
        set : (v) => v===""? "https://ihplb.b-cdn.net/wp-content/uploads/2021/11/eifel-tower-736x430.jpg":v,
    },
    price : Number,
    location : String,
    country : String,
})

module.exports = mongoose.model("listing", listingSchema)


