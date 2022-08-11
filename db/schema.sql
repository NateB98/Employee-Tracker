DROP DATABASE IF EXISTS employee_tracking_db;

CREATE DATABASE employee_tracking_db;

USE employee_tracking_db;

CREATE TABLE department(
  id: INT PRIMARY KEY,

  name: VARCHAR(30),
);

CREATE TABLE role(
  id: INT PRIMARY KEY,

  title: VARCHAR(30),

  salary: DECIMAL,

  department_id: INT
);

CREATE TABLE employee(

id: INT PRIMARY KEY,

first_name: VARCHAR(30) NOT NULL,

last_name: VARCHAR(30) NOT NULL,

role_id: INT

manager_id: INT
);