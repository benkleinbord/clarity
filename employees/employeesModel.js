const employeeModel = {
  id:{
    name:"id",
    type: String,
    require: true
  },
  name:{
    name:"name",
    type: String,
    require: true
  },
  lastName:{
    name:"lastName",
    type: String,
    require: true
  },
  age:{
    name:"age",
    type: String,
    require: true
  },
  birthday:{
    name:"birthday",
    type: String,
    require: false
  },
  role:{
    name:"role",
    type: String,
    require: true
  },
  salary:{
    name:"salary",
    type: String,
    require: true
  },
  yearsOfExperience:{
    name:"yearsOfExperience",
    type: String,
    require: true
  },
  score:{
    name:"score",
    type: String,
    require: false
  },
  address:{
    name:"address",
    type: String,
    require: false
  },
  phone:{
    name:"phone",
    type: String,
    require: true
  }
}
module.exports = {
  employeeModel
}