const oracledb = require('oracledb');
const dbConfig = require('./db-config.js');
const employees = require('./employees.js');

oracledb.createPool(dbConfig)
  .then(function() {
    // return employees.getEmployee(101);
    return employees.getEmployees();
  })
  .then(function(emp) {
    console.log(emp);
  })
  .catch(function(err) {
    console.log(err);
  });