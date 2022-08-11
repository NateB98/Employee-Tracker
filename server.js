const inquirer = require('inquirer');
const mysql2 = require('mysql2')
const table = require('console.table');
const db = require('.')

const connect = mysql2.createConnection({
  host: 'localhost',

  port: 3333,

  user: 'root',
  password: 'Empyre',
  database: 'employee_tracking_db'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connect.threadId);

  startScreen();
});

function startScreen() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })

    .then(function (result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "View All Employees":
          viewEmployees();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "View All Departments":
          viewDepartment();
          break;

        default:
          quit();
      }
    });
}

function addDepartment() {
  inquirer.prompt({
    
      type: "input",
      message: "What is the department name?",
      name: "departmentName"

  }).then(function(answer){



      connection.query(`INSERT INTO department (name) VALUES (?)`, [answer.deptName] , function(err, res) {
          if (err) throw err;
          console.table(res)
          startScreen()
  })
  })
}

function addRole() {
inquirer
  .prompt([
    {
      type: "input",
      message: "What's the name of the role?",
      name: "roleName"
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "totalSalary"
    },
    {
      type: "input",
      message: "What is the id number for the department?",
      name: "departmentID"
    }
  ])
  .then(function(answer) {


    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.totalSalary, answer.departmentID], function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  });
}