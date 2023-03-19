const employeeErrorHandling = require('./employeeErrorHandling');
const employeesCacheData = require('./employeesCacheData');
const employeeModel = require('./employeesModel');
const employeeCrud = require('./employeesCrud');


const createValidateResponse = (isValidate,data,errorType) =>{
  if(!isValidate){
    return {validate:false,errorType};
  }
  return {validate:true,data:data};
};

const getErrorTypes = (addInfo)=>{
  return employeeErrorHandling.errorTypesDic(addInfo);
};

const isValidateTypeDataIndex = (type) =>{
  return employeesCacheData.isValidateTypeOfIndex(type);
};

const isAllKeysRequiresExist=(data)=>{
  try{
    const model = employeeModel.employeeModel;
    for(let key in model){
      if(model[key].require && !data[key]){
          return createValidateResponse(false,key,getErrorTypes(key).dataTypeIsRequire);
      }
    }
    return createValidateResponse(true,data);
  }
  catch(error){
    console.log("employeeValidationService in isAllKeysRequiresExist error: "+error);
    return createValidateResponse(false,key,getErrorTypes().somethingWentWrong); 
  }
};
const isValidDataToUpdate = async (key,value)=>{
  try{
    if(!employeesCacheData.isValidateTypeOfIndex(key)){
      return createValidateResponse(false,key,getErrorTypes(key).invalidDataType);
    }
    const model = employeeModel.employeeModel;
    switch(key){
      case model.id.name:
        const isIdExist = await isIndexTypeAlreadyExist(model.id.name,value);
        if(!isIdExist){
          return createValidateResponse(false,key,getErrorTypes().employeeNotExist);
        }
       break;
      case model.age.name:
        if(!isNumberValueValid(value,18,90)){
          return createValidateResponse(false,key,getErrorTypes().invalidAge);
        }
       break;
      case model.salary.name:
        if(!isNumberValueValid(value,1000,6000)){
          return createValidateResponse(false,key,getErrorTypes().invalidSalary);
        }
      break;
    }
    return createValidateResponse(true,key);
  }
  catch(error){
    console.log("employeeValidationService in isValidateDataInsert error: "+error);
     return createValidateResponse(false,key,getErrorTypes().somethingWentWrong); 
  }
}
const isValidDataInsert = async (key,value)=>{
  try{
    if(!employeesCacheData.isValidateTypeOfIndex(key)){
      return createValidateResponse(false,key,getErrorTypes(key).invalidDataType);
    }
    const model = employeeModel.employeeModel;
    switch(key){
      case model.id.name:
        if(await isIndexTypeAlreadyExist(model.id.name,value)){
          return createValidateResponse(false,key,getErrorTypes().idAlreadyExist);
        }
       break;
      case model.age.name:
        if(!isNumberValueValid(value,18,90)){
          return createValidateResponse(false,key,getErrorTypes().invalidAge);
        }
       break;
      case model.salary.name:
        if(!isNumberValueValid(value,1000,6000)){
          return createValidateResponse(false,key,getErrorTypes().invalidSalary);
        }
      break;
    }
    return createValidateResponse(true,key);
  }
  catch(error){
    console.log("employeeValidationService in isValidateDataInsert error: "+error);
     return createValidateResponse(false,key,getErrorTypes().somethingWentWrong); 
  }
};

const isIndexTypeAlreadyExist = async (typeName,value) =>{
  try{
    const id = await employeeCrud.getEmployeesByType(typeName,value);
    if(!id){
      return false;
    }
    return true;
  }
  catch(error){
    console.log("employeeValidationService in isIdAlreadyExist error: "+error);
  }
};

const isNumberValueValid= (value,min,max)=>{
    if(value>=min && value<=max){
      return true;
    }
    return false;
};

module.exports = {
  createValidateResponse,
  getErrorTypes,
  isValidateTypeDataIndex,
  isValidDataInsert,
  isAllKeysRequiresExist,
  isIndexTypeAlreadyExist,
  isValidDataToUpdate
}