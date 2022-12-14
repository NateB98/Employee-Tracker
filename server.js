const inquirer = require('inquirer');
const mysql = require('mysql2')
const cTable = require('console.table');
// const db = require(".");

const connection = mysql.createConnection({
  host: 'localhost',

  user: 'root',
  password: '',
  database: 'employee_tracking_db'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

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

        case "Add Employee":
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
  inquirer
    .prompt({

      type: "input",
      message: "What is the department name?",
      name: "departmentName"

    }).then(function (answer) {
      connection.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, res) {
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
    .then(function (answer) {
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.totalSalary, answer.departmentID], function (err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "employeeFN"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "employeeLN"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.employeeFN, answer.employeeLN, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "What role do you want the employee to update to?",
        name: "updateRole"
      }
    ])
    .then(function (answer) {
      connection.query("UPDATE employee SET role_id=? WHERE first_name= ?", [answer.updateRole, answer.employeeUpdate], function (err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function viewDepartment() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res)
    startScreen();
  });
}

function viewRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function quit() {
  connection.end();
  process.exit();
}