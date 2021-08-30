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
import { addDepartmentQuestion, addEmployeesQuestions } from "./questions/addQuestions.js";

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

// Get user input for a department name to be added
async function promptAddDept() {

    // Prompt with question
    let answer = await inquirer.prompt(addDepartmentQuestion);

    // Return department to be added
    return answer.department;
}

async function promptAddRole() {

    let addRoleQuestions = await generateRoleQuestions();

    let answer = await inquirer.prompt(addRoleQuestions);

    return answer;

}

async function promptAddEmployee() {

    let answer = await inquirer.prompt(addEmployeesQuestions);

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
            return await addRole(db, ["Lawyer", "100000", 4]);

        // Adding a new employee
        case "Add an employee":
            let employeeToAdd = await promptAddEmployee();
            return await addEmployee(db, ["Jimbo", "Haller", 7, null]);

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

async function generateRoleQuestions() {

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

    return new Promise((resolve, reject) => {
        db.query("SELECT name FROM department", (err, rows) => {

            if (err) {
                console.log(err);
                return reject(err)
            } else {

                let newChoices = JSON.parse(JSON.stringify(rows)).map(object =>
                    object.name);

                roleQuestions.push({
                    name: "deptName",
                    type: "list",
                    message: "Which department does this role belong to?",
                    choices: newChoices
                });

                return resolve(roleQuestions);
            }
        });

    });

}

// Start the application up
init();