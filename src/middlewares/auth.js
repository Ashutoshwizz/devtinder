const adminauth=(req,res,next)=>{
    console.log("admin auth is getting checked");
    const token="abc";
    const isadminauth=token==="abc";
    if(!isadminauth){
        res.status(401).send("unauthorised acess");
    }else{
        next();
    }
}

module.exports={adminauth};