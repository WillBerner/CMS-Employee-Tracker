export const viewDepartments = async (db) => {
    db.query("SELECT * FROM department", (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    });
}

export const viewRoles = async (db) => {

    let queryString = "SELECT role.id, role.title AS title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id";

    db.query(queryString, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    })
}

export const viewEmployees = async (db) => {

    let queryString = "SELECT e.id AS id, e.first_name, e.last_name, role.title AS title, name AS department, salary, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY id ASC";

    db.query(queryString, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    })
}