var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");


var campgrounds = [
    {name: "Salmon Creek", image:"https://c7.alamy.com/comp/3/77138800e2f04906889f0a2763aa3af3/ak370k.jpg"},
    {name: "Granite Hill", image:"https://c7.alamy.com/comp/3/d81c2c251ec746b1b38083becd19bb45/dhw0cd.jpg"},
    {name: "Mountain Goat's Rest", image:"https://c7.alamy.com/comp/3/d3d7a11d7a124cc3849d0e2b8a7a95d7/2bt7dpj.jpg"}
   ];

app.get("/", function(req, res){
    res.render("landingpage")
});
cd 
app.get("/campgrounds", function(req, res){
        res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image}; 
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
}); 


app.listen(process.env.PORT||5500, process.env.IP, function(){
    console.log("The YelpCamp has started!");
});

