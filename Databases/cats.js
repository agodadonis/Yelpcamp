var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catShema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String,
});

var Cat = mongoose.model("Cat", catShema);

// // adding new cat to database
// var george = new Cat({
//     name: "Miss Norris",
//     age: 11,
//     temperament: "Evil"
// });
// george.save(function(err, cat){
//     if(err){
//         console.log("something went wrong");
//     }else{
//         console.log("we just saved a cat to database");
//         console.log(cat);
//     };
    
// });

Cat.create({
    name: "Snow",
    age: 4,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    } else {
        console.log("ALL THE CATS");
        console.log(cats);
    }
});



