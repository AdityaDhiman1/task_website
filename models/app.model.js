let mongoose = require('mongoose');

let toDoSchema = new mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Time: {type:String, reqired: true},
    Task_Status: {type: String, default: "InComplete", required: true}
});

let list = new mongoose.model("list", toDoSchema);

module.exports = list;