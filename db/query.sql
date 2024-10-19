SELECT department.department_name AS department, role.title AS role, employee.first_name, employee.last_name, employee.manager_id
FROM employee
LEFT JOIN department
ON employee.department_id = department.id
ORDER BY department.department_name;
