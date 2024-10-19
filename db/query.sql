SELECT 
    employee.employee_id AS id, 
    employee.first_name, 
    employee.last_name, 
    role.title AS title,  
    role.salary, 
    CASE 
        WHEN manager.employee_id IS NULL THEN 'null'
        ELSE CONCAT(manager.first_name, ' ', manager.last_name) 
    END AS Manager
FROM employee
LEFT JOIN role ON employee.role_id = role.role_id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.employee_id  -- Self-join to get manager info
ORDER BY employee.employee_id;
