const employeeController = require('./employeesController');
const errorHandling = require('../middleware/errorHandlingMiddleware');
const authentication = require('../middleware/authentication_middleware');
//** should be authentication, and put it as middleware */
//** example:  const authentication = require('./authentication)
/**  app.post('/employee',authentication.authentication ,employeeController.LoginController);  */

module.exports = (app) => {
  app.get('/v1/employees',authentication.authentication,employeeController.getAllEmployees,errorHandling.errorHandling);
  app.get('/v1/employees/:id',authentication.authentication,employeeController.getEmployee,errorHandling.errorHandling);
  app.post('/v1/employees/many',authentication.authentication,employeeController.getManyEmployees,errorHandling.errorHandling);
  app.get('/v1/employees/type/:type/:typeData',authentication.authentication,employeeController.getEmployeesByType,errorHandling.errorHandling);
  app.post('/v1/employees',authentication.authentication,errorHandling.errorHandling,employeeController.setNewEmployee,errorHandling.errorHandling);
  app.put('/v1/employees',authentication.authentication,employeeController.updateEmployee,errorHandling.errorHandling);
  app.delete('/v1/employees',authentication.authentication,employeeController.deleteEmployee,errorHandling.errorHandling);
}