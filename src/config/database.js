//here i will write the logic to connect to our data base

const mongoose = require('mongoose');
require('dotenv').config();
//this is to connect to cluster

const connectdb= async ()=>{
   // mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME};
     await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`
    );
};



module.exports={connectdb};



