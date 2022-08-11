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

