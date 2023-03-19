const employeesService = require('./employeesService');
const employeeErrorHandling = require('./employeeErrorHandling');



const getAllEmployees= async (req,res)=>{
  try{
    const resData = await employeesService.getAllEmployees();
    if(!resData.validate){
      return res.status(resData.errorType.status).send(resData.errorType.msg);
    }
      return res.status(200).json(resData.data);
  }
  catch(err){
    next(err);
  }
};

const getEmployee = async (req,res,next)=>{
  try{
    if(!req.params.id){
      return res.status(resData.errorType.status).send(resData.errorType.msg);
    }
    const resData = await employeesService.getEmployeesByType("id",req.params.id);
    if(!resData.validate){    
      return res.status(resData.errorType.status).send(resData.errorType.msg);;
    }
      return res.status(200).json(resData.data);
    }
    catch(err){
      next(err);
    }
};
const getManyEmployees = async (req,res,next) =>{
  try{
    const data = req.body;
    const resData = await employeesService.getManyEmployees(data);
    if(!resData.validate){
      return res.status(resData.errorType.status).send(resData.errorType.msg);
    }
      return res.status(200).json(resData.data);
      

  }
  catch(error){
    next(error);
  }
}

const getEmployeesByType = async (req,res,next)=>{
  try{
    if(!req.params.type&&!req.params.typeData){
      const error = employeeErrorHandling.getErrorType(errorTypeDic.dataType);
      return res.status(error.status).send(error.msg);
    };

    const resData = await employeesService.getEmployeesByType(req.params.type,req.params.typeData);
    if(!resData.validate){
      return res.status(resData.errorType.status).send(resData.errorType.msg);
    }
      return res.status(200).json(resData.data);
  }
  catch(error){
    next(error);
  }
};

const setNewEmployee = async (req,res,next)=>{
  try{
    let data = req.body;
    const resData = await employeesService.setNewEmployee(data);
    if(!resData.validate){
      return res.status(resData.errorType.status).send(resData.errorType.msg);
    }
      return res.status(201).json({"success":{"id":resData.data.id}});
  }
  catch(error){
    next(error);
  }
};

const deleteEmployee = async (req,res,next)=>{
  try{
    let id = req.body.id;
    const resData = await employeesService.deleteEmployee(id);
    if(!resData.validate){
      return res.status(resData.errorType.status).send(resData.errorType.msg);
    }
      return res.status(200).json(resData.data);
  }
  catch(error){
    next(error);
  }
};

const updateEmployee= async (req,res,next)=>{
  try{
    let data = req.body;
    const resData = await employeesService.updateEmployee(data);
    if(!resData.validate){
      return res.status(resData.errorType.status).send(resData.errorType.msg);
    }
      return res.status(201).json(resData.data);
  }
  catch(error){
    next(error);
  }
}
module.exports={
  getAllEmployees,
  getEmployee,
  getManyEmployees,
  getEmployeesByType,
  setNewEmployee,
  deleteEmployee,
  updateEmployee
}