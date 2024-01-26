let mongoose = require('mongoose');


// mongodb+srv://aditya:1234@cluster0.tte6gaz.mongodb.net/TASK_DATABASE?retryWrites=true&w=majority

const connectDB = (URI) => {
    mongoose.connect(URI)
.then(() => {
    console.log("DATABASE connected...");
})
.catch((error) => {
    console.log("EXCEPTION "+error);
})
}



module.exports = connectDB;