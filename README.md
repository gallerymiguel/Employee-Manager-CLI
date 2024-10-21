# Employee Manager CLI

## Description

The **Employee Manager CLI** is a command-line application that allows users to manage and track employee records, including their roles, departments, and managers. This project simulates a real-world employee database system, where users can easily interact with data using a user-friendly terminal interface.

## Features

- **View all employees**: Displays a list of all employees, their roles, and managers.
- **Add a new employee**: Prompts the user to enter employee details and inserts them into the database.
- **Update employee role**: Allows updating an employee's current role.
- **View all roles**: Shows all job roles within the company.
- **Add a new role**: Prompts for role details and adds them to the database.
- **View all departments**: Lists all company departments.
- **Add a new department**: Creates a new department in the database.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/employee-manager-cli.git
```

2. Navigate to the project directory:
```bash
cd employee-manager-cli
```

3. Install dependencies:
```bash
npm install
```

4.  Set up the database: 

 Ensure you have PostgreSQL installed and set up according to the instructions in the db/ folder. Run the schema and seeds SQL scripts to initialize the database.


5. Compile TypeScript (if necessary):
```bash
   tsc
```
## Usage
1. Start the application:

```bash
node dist/CLI.js
```

2. Follow the prompts in the terminal to interact with the employee database.

## Dependencies
* Node.js
* TypeScript
* Inquirer.js (for user prompts)
* PostgreSQL (for database)
* Figlet (for the startup ASCII art)

## Video Demonstration:
(Optional: Include a few screenshots showing the interface and interactions.)

## License
This project is licensed under the MIT License.







