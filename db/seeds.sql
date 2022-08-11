INSERT INTO department(name)
VALUES("Accounting"),("Human Resources"),("Sales"),("Marketing")

INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 70000.00, 1),("Human Resources Specialist", 59000.00, 2),("Sales Specialist", 68000.00, 3),("Marketing Specialist", 73000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Steve", "Buscemi", 1, 4), ("Jason", "Momoa", 2, 3), ("Chris", "Pratt", 3, 2), ("Snoop", "Dogg", 4, 1)