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