export const addDepartment = async (db, deptName) => {
    db.query("INSERT INTO department (name) VALUES (?);", deptName, (err, result) => {
        if (err) { console.log(err); return; }

        console.log("Added new department successfully.");
    });
}

export const addRole = async (db, newRole) => {
    db.query("INSERT INTO role (title, salary, department_id) VALUES (?);", [newRole], (err, result) => {
        if (err) { console.log(err); return; }

        console.log("Added new role successfully.");
    });
}

export const addEmployee = async (db, newEmployee) => {
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)", [newEmployee], (err, result) => {
        if (err) { console.log(err); return; }

        console.log("Added new employee successfully.");
    })
}
