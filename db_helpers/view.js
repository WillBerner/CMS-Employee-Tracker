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
    db.query("SELECT * FROM role", (err, rows) => {
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