// Importing inquirer for gathering user input and console.table to display data
import inquirer from "inquirer";
import cTable from "console.table";

// Importing db from external file
import { db } from "./config/connection.js";

// Importing table viewing helper functions
import { viewDepartments, viewRoles, viewEmployees } from "./db_helpers/view.js";
import { addDepartment, addRole, addEmployee } from "./db_helpers/add.js";

// Importing questions from external file
import { startQuestions } from "./questions/startQuestions.js";

// Main function to start the application up
async function init() {

    // Will hold whatever action the user wants to take
    let results = null;

    // Always ask at least one question
    do {

        // Gather user input
        results = await inquirer.prompt(startQuestions);

        // Determine what the user selected and take action
        await determineUserInput(results.selection);

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

// Determines which choice the user made
async function determineUserInput(selectionInput) {

    switch (selectionInput) {

        case "Quit":
            return;

        case "Add a department":
            return await addDepartment(db, "SomeDepartment");

        case "Add a role":
            return await addRole(db, ["Lawyer", "100000", 4]);

        case "Add an employee":
            return await addEmployee(db, ["Jimbo", "Haller", 7, null]);

        case "View all departments":
            return await viewDepartments(db);

        case "View all roles":
            return await viewRoles(db);

        case "View all employees":
            return await viewEmployees(db);

        case "Update an employee's role":
            console.log("Update employee!");
            break;

        default:
            return new Error("Error: Selection is not supported!");
    }

    return;
}

// Start the application up
init();