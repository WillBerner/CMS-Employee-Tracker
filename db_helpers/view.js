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


    let queryString = "SELECT role.id, role.title AS role_title, department.name AS department_name, role.salary FROM role JOIN department ON role.department_id = department.id";

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
    db.query("SELECT * FROM employee", (err, rows) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(rows);
        }
    })
}