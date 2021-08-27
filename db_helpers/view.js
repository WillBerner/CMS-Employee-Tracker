export const viewDepartments = (db) => {
    db.query("SELECT * FROM department", (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows)
    });
}