const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/ToDoListDB", { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const ThingsToDo = mongoose.model("ThingsToDo", itemsSchema);

// Create a new day todo item
async function createDayToDoItem(name) {

    try {
        const newThingToDo = new ThingsToDo({ name });
        await newThingToDo.save();
    } catch (error) {
        console.log(error)
    }
    
}

// Get all day todo items
async function getAllDayToDoItems() {

    try {
        const thingsToDo = await ThingsToDo.find().exec();
        return thingsToDo.map(thing => thing.name);
    } catch (error) {
        console.log(error)
    }
    
}

// Update a day todo item
async function updateDayToDoItem(id, name) {
    try {
        await ThingsToDo.updateOne({ _id: id }, {name: name });
    } catch (error) {
        console.log(error)
    }
    
    
}

// Delete a day todo item
async function deleteDayToDoItem(id) {
    try {
        await ThingsToDo.findByIdAndDelete(id);
    } catch (error) {
        console.log(error)
    }
    
}

// Create a new work todo item
async function createWorkToDoItem(name) {

    try {
        const newThingToDo = new ThingsToDo({ name });
    await newThingToDo.save();
    } catch (error) {
        console.log(error)
    }
    
}

// Get all work todo items
async function getAllWorkToDoItems() {

    try {
        const thingsToDo = await ThingsToDo.find().exec();
        return thingsToDo.map(thing => thing.name);
    } catch (error) {
        console.log(error)
    }
   
}

// Update a work todo item
async function updateWorkToDoItem(id, name) {

    try {
        await ThingsToDo.findByIdAndUpdate(id, { name });

    } catch (error) {
        console.log(error)
    }
    
}


// Delete a work todo item
async function deleteWorkToDoItem(id) {

    try {
        await ThingsToDo.findByIdAndDelete(id);
    } catch (error) {
        console.log(error)
    }
    
}

app.get("/", async function(req, res) {

    try {
        const dayItems = await getAllDayToDoItems();
        res.render("test", { listTitle: "Today", newListItem: dayItems });
    } catch (error) {
        console.log(error)
    }
   
});

app.post("/", async function(req, res) {

    try {
        const todo = req.body.todo;
        await createDayToDoItem(todo);
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
    
});

app.post("/update", async function(req, res) {

    try {
        const updatedItem = req.body.updatedItem;
        const itemId = req.body.itemId;
        console.log("itemId: ", itemId)
        await updateDayToDoItem(itemId, updatedItem);
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
    
});

app.post("/delete", async function(req, res) {

    try {
        const itemId = req.body.deleteItem;
        await deleteDayToDoItem(itemId);
        res.redirect("/");
    } catch (error) {
        console.log(error)
    }
    
});

app.get("/work", async function(req, res) {

    try {
        const workItems = await getAllWorkToDoItems();
        res.render("test", { listTitle: "Work List", newListItem: workItems });
    } catch (error) {
        console.log(error)
    }
    
});

app.post("/work", async function(req, res) {

    try {
        const todo = req.body.todo;
        await createWorkToDoItem(todo);
        res.redirect("/work");
    } catch (error) {
        console.log(error)
    }
   
});

app.post("/work/delete", async function(req, res) {

    try {
        const itemId = req.body.checkbox;
        await deleteWorkToDoItem(itemId);
        res.redirect("/work");
    } catch (error) {
        console.log(error)
    }
    
  });
  

app.patch("/work/update", async function(req, res) {

    try {
        const updatedItem = req.body.updatedItem;
        const itemId = req.body.itemId;
        await updateWorkToDoItem(itemId, updatedItem);
      res.redirect("/work");
    } catch (error) {
        console.log(error)
    }
    
   
    }
);

  

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
