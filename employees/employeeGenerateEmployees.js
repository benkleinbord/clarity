const {randomBytes} = require('crypto');  
const {employeeModel} = require('./employeesModel.js');

const generateEmployees = (employees)=>{
 try{
    for(let i=0;i<100;i++){
      try{
        let employee ={};
        employee[employeeModel.id.name]=randomBytes(6).toString('hex');
        employee[employeeModel.name.name] = createRandomNames(createRandomNumber(3,6));
        employee[employeeModel.lastName.name] = createRandomNames(createRandomNumber(3,12));
        employee[employeeModel.age.name] = createRandomNumber(18,90);
        employee[employeeModel.birthday.name] = birthday(employee[employeeModel.age.name]);
        employee[employeeModel.role.name] = createRole();
        employee[employeeModel.salary.name] = createRandomNumber(1500,4000);
        employee[employeeModel.yearsOfExperience.name] = createRandomNumber(0,30);
        employee[employeeModel.score.name] = createRandomNumber(0,10);
        employee[employeeModel.phone.name] = createRandomNumber(100,999)+"-"+createRandomNumber(100,999)+"-"+createRandomNumber(1000,9999);
        employee[employeeModel.address.name] = createRandomNumber(100,999)+","+createRandomNames(createRandomNumber(4,8)) + " st. "+ createRandomNames(createRandomNumber(3,6))+",New York "+ createRandomNumber(1000,99999)+", US";
        employees.push(employee);
      }
      catch(error){
        console.log("employeeGenerateEmployee in generateEmployees [For Loop] error: "+error);
      }
    }
    return employees;
  }
  catch(error){
    console.log("employeeGenerateEmployee in generateEmployees error: "+error);
    return null;
  }
}

const createRandomNames =(length)=>{
  try{
    let result="";
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while(counter<length){
      try{
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter +=1;
      }
      catch(error){
        console.log("employeeGenerateEmployee in createRandomNames [While Loop] error: "+error);
      }
    }
    return capitalizeFirstLetter(result);
  }
  catch(error){
    console.log("employeeGenerateEmployee in createRandomNames error: "+error);
    return null;
  }
}
const capitalizeFirstLetter = (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const createRandomNumber =(min,max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const createRole=()=>{
  try{
    const roles =["Waiter","cooker","Shift Manager","Director of Finance","accounts","Cashier","Barista","Kitchen manager","Manager"];
    let number = createRandomNumber(0,8);
    return roles[number];
  }
  catch(error){
    console.log("employeeGenerateEmployee in createRole error: "+error);
    return null;
  }

}
const birthday=(age)=>{
  try{
  const today = new Date();
  const year = today.getFullYear() - age;
  const birthdayDate = new Date(year, today.getMonth(), today.getDate());
  const formattedDate = birthdayDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formattedDate;
  }
  catch(error){
    console.log("employeeGenerateEmployee in createRole error: "+error);
    return null;
  }
}
module.exports={
  generateEmployees
}