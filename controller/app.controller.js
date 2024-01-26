const TaskModel = require('../models/app.model');

let taskError = false;
let titleError = false;

let home = async(req, res) => {
    let result = await TaskModel.find({});
    let index = 1;
    for (let i of result) {
        i.__v = index;
        index = index + 1;
    }
    res.render('index',{result});
}

let routine = async(req, res) => {
    res.render('tasks', {taskError, titleError});
}

let routinePost = async(req, res) => {
    try{
        let {title, task, time} = req.body;
        let data = new TaskModel({
            Title: title,
            Description: task,
            Time: time
        });
        if (title == ""){
            titleError = true;
            taskError = false;
        }
        else if(task == ""){
            titleError = false;
            taskError = true;
        }
        else{
            titleError = false;
            taskError = false;  
        }
       data =  await TaskModel.insertMany([data])
        if (data) {
           
            res.redirect('/routine?=success');
        } else {
            
            res.redirect('/routine?=notSuccessFullErrorOccur');
       }
    }
    catch(error){
        console.log("EXCEPTION => "+error.message);
        res.redirect("/routine?=ServerFail");
    }
}

let deletePost = async(req, res) => {
    try{
        let {id} = req.body;
        let query = {
            _id:id
        }
        await TaskModel.deleteOne(query)
        .then((result) => {
            console.log("Successfully deleted.");
            res.redirect('/?=deletedSuccessfully');
        })
        .catch((error) => {
            console.log(error);
            res.redirect('/?=errorInDetails');
        })
    }
    catch(error){
        console.log(error);
        res.redirect('/?=ServerFail');
    }
}
let updateStatus = async(req, res) => {
    try{
        let {id, taskStatus} = req.body;
        let query = {
            _id: id
        }
        let data = {
            $set:{
                Task_Status: "Completed"
            }
        }
        if (taskStatus == "Completed"){
            res.redirect("/?=taskIsAlreadyCompleted");
        }
        else{
            await TaskModel.updateOne(query, data)
            .then((result) => {
                console.log("Successfully updated");
                res.redirect('/?=taskStatusSuccessfullyUpdated');
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/?=ErrorInUpdating');
            })
        }
    }
    catch(error){
        console.log(error);
        res.redirect('/?=ServerFail');
    }
}
module.exports = {
    home,
    routine,
    routinePost,
    deletePost,
    updateStatus
}