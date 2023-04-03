// creatind the date module
exports.getDate = function(){
// setting some variables to hold the day number, month and day name 
    const today = new Date();
    // creating an object to hold date information
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    
    };

// using the date toLocalDateString and parameters to set the current date
return today.toLocaleDateString("en-us", options)


}


exports.getDay = function(){
    // setting some variables to hold the day number, month and day name 
        const today = new Date();
        // creating an object to hold date information
        const options = {
            weekday: "long",
        
        };
    
    // using the date toLocalDateString and parameters to set the current date
    return today.toLocaleDateString("en-us", options)
   
    
    }
// console.log(module.exports);