
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// requiring the date module 
const theDate = require(__dirname + "/date.js");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// setting app to use ejs after installation (using npm and the therminal)
app.set('view engine', 'ejs');





// declaring array to be use in get and post request
const items = [];
const workItems = [];


    

        app.get("/", function(req, res){


    // giving the date module data to the variable day
        const day = theDate.getDate();
    // using res.render to get the ejs file (list) and lookup the keys (listTitle and newListItem)
    // and pass the value of "day" and items to them.
        res.render("list", {listTitle: day, newListItem: items}) 
        
    })

    // getting and processing post request from user
    app.post("/", function(req, res){
    // using the conditional if/else statement and running a specific block of code if certain condition is met
        if(req.body.list === "work"){
            // using body-parser to store data inputed by user to variable (todo)
            const todo = req.body.todo;
            // placing the data inputed by the user into the workItems array
            workItems.push(todo);
        // if this condition is true redirects to work route
            res.redirect("/work");
        }else{
            // creating a variable to hold data entered by user
            const todo = req.body.todo;
        // placing item inputed by user into items array
            items.push(todo);
        // redirecting response to the root route to be posted
            res.redirect("/");
        }
        

        })

    // get request for work route
    app.get("/work", function(req, res){
        res.render("list", {listTitle: "work", newListItem: workItems })
    })

    app.get("/about", function(req, res){
        res.render("about");
    })



    app.listen(3000, function(){
        console.log("Server is listening at port 3000");
    })

 

































// using the switch medthod to display a different day name based on the day number)
    // switch(currentDay){
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Error, current day is: " + currentDay);
    // }