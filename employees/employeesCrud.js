const employeesCacheData = require('./employeesCacheData');
const employeeModel = require('./employeesModel');
const getAllEmployees  = async () =>{
  try{
    let employees = await employeesCacheData.getEmployeesData();
    return employees;
  }
  catch(error){
    console.log("employeeCrud in getAllEmployees error: "+error);
    return null;
  }
};
const getManyEmployees = async (data) =>{
  try{
    const employees = await employeesCacheData.getEmployeesData();
    const employeesIdDic = employeesCacheData.createIndexByType(employeeModel.employeeModel.id.name,employees);
    const employeesByIds = [];
    for(let id in data){
      try{
        if(employeesIdDic[id]){
          employeesByIds.push(employeesIdDic[id][0])
        }
      }
      catch(error){
        console.log("employeeCrud [For Loop] in getAllEmployees error: "+error);
      }
    }
    return employeesByIds;
  }
  catch(error){
    console.log("employeeCrud [For Loop] in getAllEmployees msg: "+error.message + " stack:"+ error.stack);
    return null;
  }
}
const getEmployeesByType = async (type,typeValue) => {
  try{
    const employees = await getAllEmployees();
    const employeesDic = employeesCacheData.createIndexByType(type,employees);
    return employeesDic[typeValue];
  }
  catch(error){
    console.log("employeeCrud in getEmployee  msg: "+error.message + " stack:"+ error.stack);
    return null;
  }
};

const setNewEmployee = async (data) =>{
  try{
    const employees = await getAllEmployees();
    employees.push(data);
    return data;
  }
  catch(error){
    console.log("employeeCrud in setNewEmployee  msg: "+error.message + " stack:"+ error.stack); 
    return null;
  }
};
const updateEmployee = async (data) =>{
  try{
    const employee = await getEmployeesByType(employeeModel.employeeModel.id.name,data.id);
    for(let key in data){
      try{
        employee[0][key] = data[key];
      }
      catch(error){
        console.log("employeeCrud [For Loop] in updateEmployee  msg: "+error.message + " stack:"+ error.stack); 
      }
    }
      return data;
  }
  catch(error){
    console.log("employeeCrud in updateEmployee  msg: "+error.message + " stack:"+ error.stack); 
    return null;
  }
}
const deleteEmployee= async (id,employees)=>{
  try{
    let index = -1;
    for(let i=0;i<employees.length;i++){
      try{
        if(employees[i].id === id){
          index = i;
        }
     }
     catch(error){
      console.log("employeeCrud [For Loop] in deleteEmployee  msg: "+error.message + " stack:"+ error.stack);
     }
    }
    if(index!==-1){
      employees.splice(index,1);
    }
  }
  catch(error){
    console.log("employeeCrud in deleteEmployee  msg: "+error.message + " stack:"+ error.stack); 
    return null;
  }
};


module.exports={
  getAllEmployees,
  getEmployeesByType,
  getManyEmployees,
  setNewEmployee,
  deleteEmployee,
  updateEmployee
}