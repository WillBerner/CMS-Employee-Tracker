// Importing inquirer for gathering user input
import inquirer from "inquirer" ;

// Import questions from external file
import { startQuestions }  from "./questions/startQuestions.js" ;

// Main function to start the application up
async function init() {

    // Will hold whatever action the user wants to take
    let results = null;

    // Always ask at least one question
    do {
        
        // Gather user input
        results = await inquirer.prompt(startQuestions)

            // Return user input data
            .then(data => data)

            // Log any errors
            .catch(error => console.log(error));

    // Continue to ask questions until user quits
    } while (results.selection !== "Quit");

}

// Start the application up
init();