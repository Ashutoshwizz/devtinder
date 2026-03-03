const mongoose=require('mongoose');

const connectionrequestschema=new mongoose.Schema({
    fromuserid:{
        type:mongoose.Schema.Types.ObjectId,
         required:true,
         //this is buildingconnection to different collection
         ref:"User"

    },
    touserid:{
        type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"User"
    },status:{
        type:String,
        enum:{
            values:[ 'ignored', 'interested', 'accepted', 'rejected'],
            message:`{value} is incorrect status`
        },
         required:true
    }

},{
    timestamps:true
}
)

//itis like a middleware it will be called evry time when connectionreq is saved
connectionrequestschema.pre("save",function(){
    const connectionrequest=this;
    //checking if from and to userid are same
    if(connectionrequest.fromuserid.equals(connectionrequest.touserid)){
        throw new Error("cannot send connection req to yourself");
    }
      // old way apne aapho jata hai next();
    
    })




//A model is a JavaScript class that represents a MongoDB collection and allows you to create, read, update, and delete document connectionrequest its a class
const connectionrequestmodle= mongoose.model("connectionrequest",connectionrequestschema)

module.exports=connectionrequestmodle;

//why schema +modal because in mongoose schema gives the validation then on top ofthat the class is made
 
