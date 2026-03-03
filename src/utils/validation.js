 const validator = require('validator');

const validatesignupdata =(req)=>{
//destructuring the object
    const {firstname,lastname,email,password}=req.body;
//we have kept in database schema also this is another way
    if(!firstname||!lastname){
        throw new Error("Name not provided")
    }
    else if(!validator.isEmail(email) ) {
        throw new Error("Provide valid email")

    }
    else if(!validator.isStrongPassword(password) ) {
        throw new Error("Provide strong password")

    }
}

const validateeditprofiledata =(req)=>{

const allowededits=["gender","age","lastname"];
     const isallowededits=Object.keys(req.body).every((field)=>{
     return  allowededits.includes(field);
    })

    return isallowededits;
}

const validateemail=(email)=>{

    if(!validator.isEmail(email) ) {
        throw new Error("Provide valid email")}
}

module.exports={validatesignupdata,validateemail,validateeditprofiledata}