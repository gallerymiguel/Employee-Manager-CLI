-- Insert departments
INSERT INTO department (department_name)
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

-- Insert roles
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sale Lead', 100000, 2),
    ('Salesperson', 80000, 2),
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 3, NULL),
    ('Mike', 'Chan', 4, 1),
    ('Ashley', 'Rodriguez', 5, NULL),
    ('Kevin', 'Tupik', 1, 3),
    ('Kunal', 'Singh', 2, NULL),
    ('Malia', 'Brown', 3, 5),
    ('Sarah', 'Lourd', 6, NULL),
    ('Tom', 'Allen', 7, 7);
