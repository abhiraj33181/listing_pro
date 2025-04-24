const express = require("express");
const app = express()
const listingModel = require("./models/listing")
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get("/", async (req,res)=>{
    let listings = await listingModel.find();
    res.render("home", {listings})
})

// creating listings 
app.get("/addlisting", (req,res)=>{
    res.render("addlisting")
})

app.post("/create", wrapAsync (async (req,res, next)=>{
    let {title, description, image, price, location, country} = req.body;

    await listingModel.create({
        title, description, image, price, location, country
    });
    console.log("Data Added!")
    res.redirect("/")

}))

// view the specific listing 
app.get("/:id/view", async (req,res)=>{
    let {id} = req.params;
    let listing = await listingModel.findOne({_id : id});
    res.render("viewlisting", {listing})
})

// updating the specific listing 
app.get("/:id/update", async (req,res)=>{
    let {id} = req.params;
    let listing = await listingModel.findOne({_id : id});
    res.render("updatelisting", {listing})
})

app.post("/:id/update", async (req,res)=>{
    let {id} = req.params;
    let {title, description, image, price, location} = req.body;
    await listingModel.findOneAndUpdate({_id : id}, {
        title, description, image, price, location
    });
    console.log("Place Updated Successfully!")
    res.redirect(`/${id}/view`)
})

// delete the specific listing 
app.get("/:id/delete", async (req,res)=>{
    let {id} = req.params;
    let listing = await listingModel.findOneAndDelete({_id : id});
    console.log("Place Deleted!")
    res.redirect("/")
})




// ho gya can you please tell 
// app.all("*") <-- kyon nhi ho rha hai 
  
// agar koi route nhi rahega toh 404 page show karna chahiye uske liye code likha tha error handling but work nhi kar rha hai 
// in most of the case that is handel by frontend but we can create it as middleware 
// now try in postmen  can we try in browser yes okay

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).send(message);
});

app.all('*', (req, res,next) => {
    next(new ExpressError(404, "Page Not Found"))
});
app.listen(3000, ()=>{
    console.log("Server Started Listening at 3000...")
})