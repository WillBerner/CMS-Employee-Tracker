// Importing inquirer for gathering user input and console.table to display data
import inquirer from "inquirer";
import cTable from "console.table";

// Importing db from external file
import { db } from "./config/connection.js";

// Importing table viewing helper functions
import { viewDepartments, viewRoles, viewEmployees } from "./db_helpers/view.js";
import { addDepartment, addRole, addEmployee } from "./db_helpers/add.js";

// Importing questions from external file
import { starterQuestions } from "./questions/starterQuestions.js";

// Main function to start the application up
async function init() {

    // Will hold whatever action the user wants to take
    let results = null;

    // Always ask at least one question
    do {

        // Gather user input
        results = await inquirer.prompt(starterQuestions);

        // Determine what the user selected and take action
        await determineUserInput(results.selection);

        // Hacky fix to force process to wait until table info is displayed before prompting again
        await sleep(500);

        // Continue to ask questions until user quits
    } while (results.selection !== "Quit");

    // End the database connection to kill the process
    db.end();
}

// Hacky fix wait for more user input until after table has been displayed
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Get user input for what department to add
async function promptAddDept() {

    // Prompt with static question
    let answer = await inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        }
    ]);

    // Return department to be added
    return answer.department;
}

// Get user input for what role to add
async function promptAddRole() {

    // Get dynamically generated questions to prompt the user with, as different departments may have been added
    let addRoleQuestions = await generateRoleQuestions();

    // Prompt the user for role name/salary/department based on current departments in the database
    let answer = await inquirer.prompt(addRoleQuestions[0]);

    // Get the id of the department in order to insert it into the database
    answer.dept_id = addRoleQuestions[1].indexOf(answer.deptName) + 1;

    // Return data to insert into database
    return answer;

}

// Get user input for what employee to add
async function promptAddEmployee() {

    let addEmployeesQuestions = await generateEmployeeQuestions();

    let answer = await inquirer.prompt(addEmployeesQuestions[0]);

    answer.role_id = addEmployeesQuestions[1].find(role => role.title === answer.employeeRole).id;
    
    answer.manager_id = (answer.employeeManager === "None") ? null : addEmployeesQuestions[2].find(manager => manager.name === answer.employeeManager).id;

    console.log(answer);

    return answer;

}

// Determines which choice the user made
async function determineUserInput(selectionInput) {

    // Take action based on what user wants to do
    switch (selectionInput) {

        // If user wants to quit, return immediately
        case "Quit":
            return;

        // Adding a new department
        case "Add a department":
            let departmentToAdd = await promptAddDept();
            return await addDepartment(db, departmentToAdd);

        // Adding a new role
        case "Add a role":
            let roleToAdd = await promptAddRole();
            return await addRole(db, [roleToAdd.roleName, roleToAdd.salary, roleToAdd.dept_id]);

        // Adding a new employee
        case "Add an employee":
            let employeeToAdd = await promptAddEmployee();
            return await addEmployee(db, [employeeToAdd.firstName, employeeToAdd.lastName, employeeToAdd.role_id, employeeToAdd.manager_id]);

        // Viewing all departments
        case "View all departments":
            return await viewDepartments(db);

        // Viewing all roles
        case "View all roles":
            return await viewRoles(db);

        // Viewing all employees
        case "View all employees":
            return await viewEmployees(db);

        // Updating the role of an employee
        case "Update an employee's role":
            console.log("Update employee!");
            break;

        // If somehow an unsupported selection in passed through, throw an error
        default:
            return new Error("Error: Selection is not supported!");
    }
}

// Generates role questions, as the choices for which department to add to can be changed through the program running
async function generateRoleQuestions() {

    // First two questions are always the same
    let roleQuestions = [
        {
            name: "roleName",
            type: "input",
            message: "What is the name of the role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?"
        }
    ];

    // Query the database for currently available departments to add a role to
    return new Promise((resolve, reject) => {

        // Get department names to create inquirer prompt
        db.query("SELECT name FROM department", (err, rows) => {

            // If anything's down, log the error and reject the promise
            if (err) {
                console.log(err);
                return reject(err)
            } else {

                // Get the current departments in a format to add to inquirer's prompt
                let departmentChoices = JSON.parse(JSON.stringify(rows))
                    .map(object => object.name);

                // Create the last question based on the current departments
                roleQuestions.push({
                    name: "deptName",
                    type: "list",
                    message: "Which department does this role belong to?",
                    choices: departmentChoices
                });

                // Return both the questions to ask as well as the currently available departments
                // in order to determine the department's id when inserting it into the database.
                return resolve([roleQuestions, departmentChoices]);
            }
        });

    });

}

async function generateEmployeeQuestions() {

    let employeeQuestions = [
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        }];

    return new Promise((resolve, reject) => {

        db.query("SELECT id, title FROM role", (err, roleRows) => {

            if (err) {
                console.log(err);
                reject(err);
            } else {

                db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name from employee where employee.manager_id IS NULL", (err, managerRows) => {

                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {

                        let roleData = JSON.parse(JSON.stringify(roleRows));
                        let roleChoices = roleData.map(role => role.title);

                        let managerData = JSON.parse(JSON.stringify(managerRows));

                        let managerChoices = managerData.map(manager => manager.name);
                        managerChoices.push('None');

                        employeeQuestions.push({
                            name: "employeeRole",
                            type: "list",
                            message: "What is the employee's role?",
                            choices: roleChoices
                        });

                        employeeQuestions.push({
                            name: "employeeManager",
                            type: "list",
                            message: "Who is the employee's manager?",
                            choices: managerChoices
                        });

                        resolve([employeeQuestions, roleData, managerData]);

                    }

                })
            }
        });
    });
}

// Start the application up
init();