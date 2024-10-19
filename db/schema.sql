DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

\c department_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(role_id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(employee_id)
    ON DELETE SET NULL
);
