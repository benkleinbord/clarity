const authentication =(req,res,next) =>{
  const auth = req.headers.authentication;
  if(auth === "getMeIn"){
    next();
  }
  if(auth !== "getMeIn"){
    res.status(401).send({error:"unauthorized"}); 
  }
}

module.exports={
    authentication
}