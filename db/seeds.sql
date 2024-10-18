INSERT INTO department (id, department_name)
VALUES (1, 'Engineering'),
       (2, 'Sales'),
       (3, 'Finance'),
       (4, 'Legal');      

INSERT INTO role (role_id, title, salary, department_id)
VALUES (01, 'Sale Lead', 100000, 2),
       (02, 'Salesperson', 80000, 2),
       (03, 'Lead Engineer', 150000, 1),
       (04, 'Software Engineer', 120000, 1),
       (05, 'Account Manager', 160000, 2),
       (06, 'Accountant', 125000, 3),
       (07, 'Legal Team Lead', 250000, 4),
       (08, 'Lawyer', 190000, 4);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (001, 'John', 'Doe', 03, NULL),
       (002, 'Mike', 'Chan', 04, 001),
       (003, 'Ashley', 'Rodriguez', 05, NULL),
       (004, 'Kevin', 'Tupik', 01, 003),
       (005, 'Kunal', 'Singh', 02, NULL),
       (006, 'Malia', 'Brown', 03, 005),
       (007, 'Sarah', 'Lourd', 06, NULL),
       (008, 'Tom', 'Allen', 07, 007);

       
