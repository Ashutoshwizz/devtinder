



//feed api get all the users from the data base
// app.get("/feed",async(req,res)=>{
//    try{
//     const users=await User.find({});
//     res.send(users); 
//    }catch(err){
//       res.status(401).send("users not found");

//    }
// });

//----------------------------------------------------
//delete perticular user
// app.delete("/user",async(req,res)=>{
//    const userid=req.body.userid;

//    try{
//       //User.findByIdAndDelete({_id:userid}); iska shortcut hai neeche wala
//       const user=await User.findByIdAndDelete(userid);
//       res.send("user delted successfully");
//    }catch(err){
//       res.status(401).send("something went wrong");

//    }
// })
//-------------------------------------------------
// //updates value
// //this userid is from url 
// app.patch("/user/:userid",async(req,res)=>{
//    const userid=req.params?.userid;
//    // const userid=req.body.userid;
//     const data =req.body;

//     const allowed_updates=["gender","age","lastname"];
//     //it checks that every key fromm data is present in allowed updates
//     const isupdatesallowed=Object.keys(data).every((k)=>{
//      return  allowed_updates.includes(k);
//     })
//     if(!isupdatesallowed){
//       return res.status(400).send("updates not possible");
//     }

//    try{
      
//       const user=await User.findByIdAndUpdate({_id:userid},data,{
//          runValidators:true
//       });
//       res.send("user updated successfully");


//    }catch(err){
//       res.status(401).send("Update failed "+err.message);

//    }

// });




