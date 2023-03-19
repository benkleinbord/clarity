const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();
require('dotenv').config();


app.use(bodyParser.json());
app.use(cors());
app.get('/health-check', (req, res) => {
  res.send("check is good! you can start");
});

connectToRoutes = () => {
  routes.ReadDirectoryForConvention('employees',"Router.js").forEach(fileInfo => {
    console.log("file ===> " + fileInfo.file);
    require(fileInfo.file)(app);
  });
}
connectToMiddleware = () => {
  routes.ReadDirectoryForConvention('middleware',"Middleware.js").forEach(fileInfo => {
    console.log("file ===> " + fileInfo.file);
    require(fileInfo.file)(app);
  });
}

//  connect to mongoose
//connect to sqeuilize

const startTheServer = () => {
  app.listen(process.env.PORT,process.env.HOSTNAME, () => {
    console.log("we are now listen to 8008 , get toned");
  });
};

executeServer = () => {
  connectToMiddleware();
  connectToRoutes();
  //await connect to mongoose
  //await connect to sequilize
  startTheServer();
}


executeServer();
