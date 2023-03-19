const employeesCrud = require('./employeesCrud');
const employeeValidationService = require('./employeeValidationService');
const employeeModel = require('./employeesModel');
const errorType = employeeValidationService.getErrorTypes();

const getAllEmployees = async () =>{
  try{
    const employees = await employeesCrud.getAllEmployees();
    if(!employees){
      return employeeValidationService.createValidateResponse(false,employees,errorType.empty);
    }
    const data = addMetaData(employees);
   return employeeValidationService.createValidateResponse(true,data);
  }
  catch(error){
    console.log("employeeService in getAllEmployees msg: "+error.message + " stack:"+ error.stack);
   return employeeValidationService.createValidateResponse(false,null,errorType.somethingWentWrong);
  }
};
const getManyEmployees = async (data) =>{ 
  const dataDic = {};
  data.map(id=>{dataDic[id]=id});
  const employees = await employeesCrud.getManyEmployees(dataDic)
  if(!employees){
    return employeeValidationService.createValidateResponse(false,employees,errorType.empty);
  }
  const resData = addMetaData(employees);
  return employeeValidationService.createValidateResponse(true,resData);
}
const getEmployeesByType = async (type,typeValue)=>{
  try{
    if(!type || !employeeValidationService.isValidateTypeDataIndex(type)){
      return employeeValidationService.createValidateResponse(false,null,errorType.dataType);
    }
    if(!typeValue){
      return employeeValidationService.createValidateResponse(false,null,errorType.valueType);
    }
    if(type && typeValue){
      let employees =  await employeesCrud.getEmployeesByType(type,typeValue);
      if(!employees){
        return employeeValidationService.createValidateResponse(true,{});
      }
      const data = addMetaData(employees);
      return employeeValidationService.createValidateResponse(true,data);
    }
  }
  catch(error){
    console.log("employeeService in getEmployee msg: "+error.message + " stack:"+ error.stack);
    return employeeValidationService.createValidateResponse(false,null,errorType.somethingWentWrong);
  }
};

const addMetaData = (data) =>{
  let metaData = {};
  let employees = {};
  metaData.items = data.length;
  employees.data = data;
  employees.metaData = metaData;
  return employees;
};

const setNewEmployee = async (data) =>{
    try{
      const isAllKeysExistObjectRes = employeeValidationService.isAllKeysRequiresExist(data);
      if(!isAllKeysExistObjectRes.validate){
        return isAllKeysExistObjectRes;
      }
      for(let key in data){
        try{
          const isValidObjectRes = await employeeValidationService.isValidDataInsert(key,data[key]);
          if(!isValidObjectRes.validate){
            return isValidObjectRes;
          }
        }
        catch(error){
          console.log("employeeService [For Loop] in setNewEmployee error: "+error.message);
        }
      }
      const employees =  await employeesCrud.setNewEmployee(data);
      if(!employees){
        return employeeValidationService.createValidateResponse(false,null,errorType.insertError);
      }
      return employeeValidationService.createValidateResponse(true,employees);
  }
  catch(error){
     console.log("employeeService in setNewEmployee msg: "+error.message + " stack:"+ error.stack);
     return employeeValidationService.createValidateResponse(false,null,errorType.somethingWentWrong);
  }
};

const deleteEmployee =  async (id) =>{
  try{
    const res = await employeeValidationService.isIndexTypeAlreadyExist(employeeModel.employeeModel.id.name,id)
    if(!res){
      return employeeValidationService.createValidateResponse(false,null,errorType.employeeNotExist);
    }
    const employees = await employeesCrud.getAllEmployees();
    if(!employees){
      return employeeValidationService.createValidateResponse(false,employees,errorType.empty);
    }
   employeesCrud.deleteEmployee(id,employees);
   const isIdExist = await employeeValidationService.isIndexTypeAlreadyExist(employeeModel.employeeModel.id.name,id)
    if(isIdExist){
      return employeeValidationService.createValidateResponse(false,null,errorType.employeeNotDeleted);
    }
    return employeeValidationService.createValidateResponse(true,{deletedId:id});
  }
  catch(error){
    console.log("employeeService in deleteEmployee msg: "+error.message + " stack:"+ error.stack);
    return employeeValidationService.createValidateResponse(false,null,errorType.somethingWentWrong);
  }
};

const updateEmployee = async (data) =>{
  try{
    for(let key in data){
      try{
        const isValidObjectRes = await employeeValidationService.isValidDataToUpdate(key,data[key]);
        if(!isValidObjectRes.validate){
          return isValidObjectRes;
        }
      }
      catch(error){
        console.log("employeeService in updateEmployee error: "+error);
      }
    }
    const employees =  await employeesCrud.updateEmployee(data);
    if(!employees){
      return employeeValidationService.createValidateResponse(false,null,errorType.insertError);
    }
    return employeeValidationService.createValidateResponse(true,employees);
  }
  catch(error){
    console.log("employeeService in updateEmployee msg: "+error.message + " stack:"+ error.stack);
    return employeeValidationService.createValidateResponse(false,null,errorType.somethingWentWrong);
  }
}

module.exports={
  getAllEmployees,
  getEmployeesByType,
  getManyEmployees,
  setNewEmployee,
  deleteEmployee,
  updateEmployee
}