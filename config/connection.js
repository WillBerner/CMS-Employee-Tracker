// Importing mysql2 to interface with mysql
import mysql from "mysql2" ;

// Create and export the db after creating a connection
export const db = mysql.createConnection(
    
    // Yes, exposing all of my credentials for this *super secret and important* database!
    // Please don't hack this! I wouldn't want to loose a whole 5 minutes of seeding dummy data!
    {
        host: "localhost",
        user: "root",
        password: "password", // super secure 😎
        database: "cms_db"
    },

    // If everything is successful, give a notification
    console.log("Database connection established.")
);