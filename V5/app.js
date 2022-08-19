const campgrounds = require("./models/campgrounds");

  var express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Campground = require("./models/campgrounds"),
      Comment = require("./models/comments"),
      seedDB = require("./seeds");

 

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


// Campground.create({
//     name: "Granite Hill",
//     image:"https://c7.alamy.com/comp/3/d81c2c251ec746b1b38083becd19bb45/dhw0cd.jpg",
//     description: "This camp is next to a huge granite hill, Hiking here is super fun!, Has neat bathrooms."
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Newly Created Campground");
//         console.log(campground);
//     }
// });

app.get("/", function(req, res){  
    res.render("landingpage")
});  

//  Index - show all campgrounds
app.get("/campgrounds", function(req, res){
    // get all campgrounds from db
Campground.find({}, function(err, allCampgrounds){
    if(err){
        console.log(err)
    } else {
        res.render("campgrounds/index",{campgrounds: allCampgrounds});
    }
});
       
});
  
// CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description}; 
// Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
              // redirect back to campgrounds page
              res.redirect("/campgrounds");
        }
    });
  
});

// NEW- Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
}); 


// SHOW- Show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
              // render the show template of that campground
              res.render("campgrounds/show", {campground: foundCampground}); 
        }  
    });
   
    
});

// =====================
// Comments route
// =====================
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});
        }
    })
   
});


// post new comment
app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground with id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect
})

app.listen(process.env.PORT||5500, process.env.IP, function(){
    console.log("The YelpCamp has started!");
});

