// Importing inquirer for gathering user input and console.table to display data
import inquirer from "inquirer";
import cTable from "console.table";

// Importing db from external file
import { db } from "./config/connection.js";

import { viewDepartments } from "./db_helpers/view.js";

// Importing questions from external file
import { startQuestions }  from "./questions/startQuestions.js" ;

// Main function to start the application up
async function init() {

    // Will hold whatever action the user wants to take
    let results = null;

    // Always ask at least one question
    do {
        
        // Gather user input
        results = await inquirer.prompt(startQuestions)

        // Determine what the user selected and take action
        determineUserInput(results.selection);

    // Continue to ask questions until user quits
    } while (results.selection !== "Quit");

    // End the database connection to kill the process
    db.end();
}

// Determines which choice the user made
function determineUserInput(selectionInput) {

    switch (selectionInput) {
        case "Quit":
            return;
        case "Add a department":
            console.log("Add Dept!");
            break;
        case "Add a role":
            console.log("Add role!");
            break;
        case "Add an employee":

            break;
        case "View all departments": 
            viewDepartments(db);
            console.log("View Dept!");
            break;
        case "View all roles":

            break;
        case "View all employees":
            console.log("View employee!");
            break;
        case "Update an employee's role":
            console.log("Update!");

            break;
        default:
            return new Error("Error: Selection is not supported!"); 
    }

    return;
}

// Start the application up
init();