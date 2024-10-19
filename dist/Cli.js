// importing classes from other files
import inquirer from "inquirer";
import { pool } from './connection.js';
import fs from 'fs';
import path from 'path';
// define the Cli class
class Cli {
    constructor() {
        this.exit = false;
    }
    async viewAllEmployees() {
        // Read the SQL query from queries.sql file
        const queryFilePath = path.join(__dirname, 'queries.sql'); // Ensure this points to your queries.sql file
        const sql = fs.readFileSync(queryFilePath, 'utf8'); // Read the SQL file
        try {
            const result = await pool.query(sql); // Execute the query
            const employees = result.rows; // Get the rows from the result
            // Check if any employees were found
            if (employees.length === 0) {
                console.log('No employees found.');
            }
            else {
                // Log the results in a readable format
                console.table(employees); // Use console.table for better formatting
            }
        }
        catch (err) {
            console.error('Error retrieving employees:', err); // Handle any errors
        }
    }
    viewAllEmployess() { }
    async addEmployee() {
        try {
            // Fetch the list of managers from the database (employees who can be managers)
            const result = await pool.query('SELECT employee_id, first_name, last_name FROM employee');
            const managers = result.rows.map(row => ({
                name: `${row.first_name} ${row.last_name}`, // Combine first and last names
                value: row.employee_id, // Use employee_id as the value
            }));
            // Add a "None" option for employees without managers
            managers.unshift({ name: 'None', value: null });
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter employee\'s first name:',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter employee\'s last name:',
                },
                {
                    type: 'list',
                    name: 'title',
                    message: 'What is the employee\'s role?',
                    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Legal Team Lead', 'Lawyer'],
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is the employee\'s manager?',
                    choices: ['None', 'John Doe', 'Ashley Rodriguez', 'Malia Brown', 'Sarah Lourd', 'Tom Allen', 'Trevor Rieck'],
                },
            ]);
            // Add the employee to the database
            const sql = `INSERT INTO employees (first_name, last_name, title, manager_id)
          VALUES ($1, $2, $3, $4)`;
            const params = [answers.first_name, answers.last_name, answers.title, answers.manager_id];
            await pool.query(sql, params);
            console.error('Error adding employee:');
        }
        catch (err) {
            console.log('Employee added successfully!');
        }
    }
    async updateEmployeeRole() {
        try {
            // Step 1: Query to get all employees with their names and IDs
            const result = await pool.query('SELECT employee_id, first_name, last_name FROM employee');
            // Step 2: Map the employee list into a format usable by Inquirer
            const employeeChoices = result.rows.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`, // Display employee full name
                value: employee.employee_id // This will store the ID, but display the name
            }));
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Which employee\'s role would you like to update?',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'title',
                    message: 'What is the employee\'s new role?',
                    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Legal Team Lead', 'Lawyer'],
                },
            ]);
            // Update the employee's role in the database
            const sql = `UPDATE employees
          SET title = $1
          WHERE employee_id = $2`;
            const params = [answers.title, answers.employee_id];
            await pool.query(sql, params);
            console.error('Error updating role:');
        }
        catch (err) {
            console.log('Role updated successfully!');
        }
    }
    async viewAllRoles() {
        // Read the SQL query from queries.sql file
        const queryFilePath = path.join(__dirname, 'queries.sql'); // Ensure this points to your queries.sql file
        const sql = fs.readFileSync(queryFilePath, 'utf8'); // Read the SQL file
        try {
            const result = await pool.query(sql); // Execute the query
            const roles = result.rows; // Get the rows from the result
            // Check if any roles were found
            if (roles.length === 0) {
                console.log('No roles found.');
            }
            else {
                // Log the results in a readable format
                console.table(roles); // Use console.table for better formatting
            }
        }
        catch (err) {
            console.error('Error retrieving roles:', err); // Handle any errors
        }
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    async addRole() {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the role title:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the role salary:',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department for this role:',
                    choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
                },
            ]);
            // Map the department name to the department ID
            const departmentIdMap = {
                Sales: 1,
                Engineering: 2,
                Finance: 3,
                Legal: 4,
            };
            // Check if the selected department exists in the map
            const departmentId = departmentIdMap[answers.department_id];
            if (departmentId === undefined) {
                throw new Error('Invalid department selected.');
            }
            // Add the role to the database
            const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES ($1, $2, $3)`;
            const params = [answers.title, answers.salary, departmentId];
            await pool.query(sql, params);
            console.log('Role added successfully!');
        }
        catch (err) {
            console.error('Error adding role:', err);
        }
    }
    async viewAllDepartments() {
        // Read the SQL query from queries.sql file
        const queryFilePath = path.join(__dirname, 'queries.sql'); // Ensure this points to your queries.sql file
        const sql = fs.readFileSync(queryFilePath, 'utf8'); // Read the SQL file
        try {
            const result = await pool.query(sql); // Execute the query
            const departments = result.rows; // Get the rows from the result
            // Check if any departments were found
            if (departments.length === 0) {
                console.log('No departments found.');
            }
            else {
                // Log the results in a readable format
                console.table(departments); // Use console.table for better formatting
            }
        }
        catch (err) {
            console.error('Error retrieving departments:', err); // Handle any errors
        }
    }
    async addDepartment() {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the department name:',
                },
            ]);
            // Add the department to the database
            const sql = `INSERT INTO departments (name)
        VALUES ($1)`;
            const params = [answers.name];
            await pool.query(sql, params);
            console.error('Error adding department:');
        }
        catch (err) {
            console.log('Department added successfully!');
        }
    }
    // method to start the cli
    startCli() {
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'CreateOrSelect',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
            },
        ])
            .then((answers) => {
            // check if the user wants to create a new vehicle or select an existing vehicle
            if (answers.CreateOrSelect === 'View All Employees') {
                this.viewAllEmployees();
            }
            else if (answers.CreateOrSelect === 'Add Employee') {
                this.addEmployee();
            }
            else if (answers.CreateOrSelect === 'Update Employee Role') {
                this.updateEmployeeRole();
            }
            else if (answers.CreateOrSelect === 'View All Roles') {
                this.viewAllRoles();
            }
            else if (answers.CreateOrSelect === 'Add Role') {
                this.addRole();
            }
            else if (answers.CreateOrSelect === 'View All Departments') {
                this.viewAllDepartments();
            }
            else if (answers.CreateOrSelect === 'Add Department') {
                this.addDepartment();
            }
            else {
                this.exit = true;
            }
        });
    }
}
// export the Cli class
export default Cli;
