//here i will write the logic to connect to our data base

const mongoose = require('mongoose');
//this is to connect to cluster

const connectdb= async ()=>{
    await mongoose.connect("mongodb+srv://ashudev:Ashudev@cluster0.cwd6inb.mongodb.net/devtinder");
};



module.exports={connectdb};



