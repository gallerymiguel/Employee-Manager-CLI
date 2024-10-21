import inquirer from 'inquirer';
import { pool } from './connection.js'; // Adjust the path if necessary
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import figlet from 'figlet';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Display 'EMPLOYEE MANAGER' at startup
figlet('EMPLOYEE MANAGER', (err, result) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    if (result) {
        console.log(result);
    }
    // Start your application by initializing the CLI class
    const cli = new Cli();
    cli.startCli(); // Start the CLI interaction
});
export class Cli {
    constructor() {
        this.exit = false;
    }
    async viewAllEmployees() {
        const sqlFilePath = path.join(__dirname, '../db/query.sql'); // Adjust path if needed
        const sql = await fs.promises.readFile(sqlFilePath, 'utf8'); // Read the SQL file
        const result = await pool.query(sql); // Execute the query
        try {
            const result = await pool.query(sql);
            const employees = result.rows;
            if (employees.length === 0) {
                console.log('No employees found.');
            }
            else {
                console.table(employees);
            }
        }
        catch (err) {
            console.error('Error retrieving employees:', err);
        }
    }
    async addEmployee() {
        try {
            // Fetch existing managers
            const result = await pool.query('SELECT employee_id, first_name, last_name FROM employee');
            const managers = result.rows.map(row => ({
                name: `${row.first_name} ${row.last_name}`,
                value: row.employee_id,
            }));
            managers.unshift({ name: 'None', value: null }); // Option for no manager
            // Prompt for employee details
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
                    name: 'role_id',
                    message: 'What is the employee\'s role?',
                    choices: [
                        { name: 'Sales Lead', value: 1 }, // Replace with actual role IDs
                        { name: 'Salesperson', value: 2 },
                        { name: 'Lead Engineer', value: 3 },
                        { name: 'Software Engineer', value: 4 },
                        { name: 'Accountant', value: 5 },
                        { name: 'Legal Team Lead', value: 6 },
                        { name: 'Lawyer', value: 7 },
                    ],
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is the employee\'s manager?',
                    choices: managers,
                },
            ]);
            // Insert the employee into the database
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                     VALUES ($1, $2, $3, $4)`;
            const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];
            await pool.query(sql, params);
            console.log('Employee added successfully!');
        }
        catch (err) {
            console.error('Error adding employee:', err);
        }
    }
    async updateEmployeeRole() {
        try {
            const result = await pool.query('SELECT employee_id, first_name, last_name FROM employee');
            const employeeChoices = result.rows.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.employee_id,
            }));
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Which employee role would you like to update?',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the employee\'s new role?',
                    choices: [
                        { name: 'Sales Lead', value: 1 }, // Replace with actual role IDs
                        { name: 'Salesperson', value: 2 },
                        { name: 'Lead Engineer', value: 3 },
                        { name: 'Software Engineer', value: 4 },
                        { name: 'Accountant', value: 5 },
                        { name: 'Legal Team Lead', value: 6 },
                        { name: 'Lawyer', value: 7 },
                    ],
                },
            ]);
            const sql = `UPDATE employee
        SET role_id = $1
        WHERE employee_id = $2`;
            const params = [answers.role_id, answers.employee_id];
            await pool.query(sql, params);
            console.log('Role updated successfully!');
        }
        catch (err) {
            console.error('Error updating role:', err);
        }
    }
    async viewAllRoles() {
        const sql = 'SELECT title, salary FROM role'; // You can also read from queries.sql
        try {
            const result = await pool.query(sql);
            const roles = result.rows;
            if (roles.length === 0) {
                console.log('No roles found.');
            }
            else {
                console.table(roles);
            }
        }
        catch (err) {
            console.error('Error retrieving roles:', err);
        }
    }
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
            const departmentIdMap = {
                Sales: 1,
                Engineering: 2,
                Finance: 3,
                Legal: 4,
            };
            const departmentId = departmentIdMap[answers.department_id];
            if (departmentId === undefined) {
                throw new Error('Invalid department selected.');
            }
            const sql = `INSERT INTO role (title, salary, department_id)
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
        const sql = 'SELECT * FROM department'; // You can also read from queries.sql
        try {
            const result = await pool.query(sql);
            const departments = result.rows;
            if (departments.length === 0) {
                console.log('No departments found.');
            }
            else {
                console.table(departments);
            }
        }
        catch (err) {
            console.error('Error retrieving departments:', err);
        }
    }
    async addDepartment() {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'department_name',
                    message: 'Enter the department name:',
                },
            ]);
            const sql = `INSERT INTO department (department_name)
          VALUES ($1)`;
            const params = [answers.department_name];
            await pool.query(sql, params);
            console.log('Department added successfully!');
        }
        catch (err) {
            console.error('Error adding department:', err);
        }
    }
    async startCli() {
        while (!this.exit) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What would you like to do?',
                    choices: [
                        'View All Employees',
                        'Add Employee',
                        'Update Employee Role',
                        'View All Roles',
                        'Add Role',
                        'View All Departments',
                        'Add Department',
                        'Exit',
                    ],
                },
            ]);
            switch (answers.action) {
                case 'View All Employees':
                    await this.viewAllEmployees();
                    break;
                case 'Add Employee':
                    await this.addEmployee();
                    break;
                case 'Update Employee Role':
                    await this.updateEmployeeRole();
                    break;
                case 'View All Roles':
                    await this.viewAllRoles();
                    break;
                case 'Add Role':
                    await this.addRole();
                    break;
                case 'View All Departments':
                    await this.viewAllDepartments();
                    break;
                case 'Add Department':
                    await this.addDepartment();
                    break;
                case 'Exit':
                    this.exit = true;
                    console.log('Exiting the application. Goodbye!');
                    break;
            }
        }
    }
}
// // Create an instance and start the CLI
// const cli = new Cli();
// connectToDb().then(() => cli.startCli());
