const read = require('fs-readdir-recursive');
const ReadDirectoryForConvention= (dir,convention)=>{
  let files = [];
  read(dir).filter(file=>{
    return (file.indexOf(convention)>-1);
  })
  .forEach(file=>{
    let fileInfo = {};
    fileInfo.file = '../'+dir+"/"+file.replace(/\\/g,"/");
    files.push(fileInfo);
  });
  return files;
}

module.exports={
  ReadDirectoryForConvention
};