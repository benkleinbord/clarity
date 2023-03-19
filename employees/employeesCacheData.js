const employeeGenerateEmployee = require('./employeeGenerateEmployees');
const employeeModel = require('./employeesModel');
const employees =[]; 
const getEmployeesData = async ()=>{
  try{
    if(employees.length === 0){
      employeeGenerateEmployee.generateEmployees(employees);
    }
    return employees;
  }
  catch(error){
    console.log("employeesCacheData in getEmployeesData error: "+error);
    return [];
  }
}
const createIndexByType = (typeOfIndex,employees)=>{
  if(!validateDynamicTypeOfIndex(typeOfIndex,employees)){
    throw new Error('employeesCacheData in createIndexByType this type of employee don\'t exist ==>' +typeOfIndex);
  }
  try{
    const dataByIndex  = {};
    for(let index in employees){
      try{
        let indexType = employees[index][typeOfIndex];
        if(!dataByIndex[indexType]){
          dataByIndex[indexType] = [];
          dataByIndex[indexType].push(employees[index]);
        }
        else{
          dataByIndex[indexType].push(employees[index]);
        }
      }
      catch(error){
        console.log("employeesCacheData in createIndexByType [For Loop] error: "+error);
      }
    }
    return dataByIndex;
}
catch(error){
  console.log("employeesCacheData in createIndexByType error: "+error);
}
}
const validateDynamicTypeOfIndex=(typeOfIndex,employees)=>{
  try{
    let keys = Object.keys(employees[0]);
    for(let data in keys){
      if(typeOfIndex === keys[data]){
        return true;
      }
    }
    return false;
  }
  catch(error){
    console.log("employeesCacheData in validateTypeOfIndex error: "+error);
  }
}
const isValidateTypeOfIndex=(typeOfIndex)=>{
  try{
    let model = employeeModel.employeeModel;
    for(let key in model){
      if(typeOfIndex === key){
        return true;
      }
    }
    return false;
  }
  catch(error){
    console.log("employeesCacheData in validateTypeOfIndex error: "+error);
  }
}
module.exports={
  getEmployeesData,
  createIndexByType,
  isValidateTypeOfIndex,
  validateDynamicTypeOfIndex
}