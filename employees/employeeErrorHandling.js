

const createErrorMsg =(status,msg) =>{
  const msgArray = [];
  msgArray.push(msg);
  return {status:status,msgArray};
}

const errorTypesDic = (addInfo) =>{
  const errorTypeDic = {
    empty: { status:501, msg:{error:"empty"}},
    dataType:{status:501, msg:{error:"dataType"}},
    valueType:{status:501,msg:{error:"valueType"}},
    idAlreadyExist:{status:200,msg:{error: "idAlreadyExist"}},
    invalidDataType:{status:200,msg:{error: addInfo+":invalidDataType"}},
    invalidAge:{status:200,msg:{error: "invalidAge"}},
    invalidSalary:{status:200,msg:{error: "invalidSalary"}},
    somethingWentWrong:{status:501,msg:{error: "somethingWentWrong"}},
    dataTypeIsRequire:{status:501,msg:{error: addInfo+":dataTypeIsRequire"}},
    insertError:{status:501,msg:{error: "insertError"}},
    employeeNotExist:{status:200,msg:{error:"employeeNotExist"}},
    employeeNotDeleted:{status:200,msg:{error:"employeeNotDeleted"}}
  };
  return errorTypeDic;
}
const getErrorType = (type) =>{
  let errorType = errorTypesDic();
  return errorType[type];
}

module.exports = {
  createErrorMsg,
  getErrorType,
  errorTypesDic
}