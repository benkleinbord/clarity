
const errorHandling = (err,req,res,next) =>{
  console.log("msg:"+err.message + "stack: "+err.stack);
  if(err.message.indexOf("JSON")!=-1){
    res.status(500).send({error:"jsonBroken"});
  }
  
  res.status(500).send({error:"somethingWentWrong"});
}

module.exports = (app) => {
  app.use(errorHandling);
  return module.exports= {
    errorHandling
  }
}
