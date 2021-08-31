# CMS-Employee-Tracker
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Employee Tracker is a content management system for keeping track of departments, positions (roles), and employees for any organization. The application is built with Node.js and MySQL and makes use of mysql2, Inquirer, and console.table npm packages.


## Table of Contents
   
* [Installation Instructions](#installation-instructions)
* [Usage Instructions](#usage-instructions)
* [Demo](#demo)
* [Contributions](#contributions)
* [Questions](#questions)

## Installation Instructions

First, download or clone the repository to your local machine. Then from within the root directory, run:

    npm i

to install all the necessary npm depenedencies.

Next, you will need to connect the application to a MySQL database running locally on your machine. First, make sure you have a MySQL server [installed and running on your machine.](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) After confirming you have a server running, you will need to edit the file config/connection.js based on your local MySQL server's credentials:

    export const db = mysql.createConnection(
      
      {
        host: "localhost",
        user: "",                 // update with your user credentials
        password: ""              // update with your password credentials
        database: cms_db
      }
      
    );

Once this is complete, you will need to navigate back to your root directory to instantiate the database using the provided schema.sql and seeds.sql files.

From the root directory, run:
    
    mysql -u <username> -p 
    
and enter your username and password credentials.

Then from inside of your MySQL shell, run:

    source db/schema.sql  // required to set up the database
    source db/seeds.sql   // optional, for seeding dummy data
    quit


The application should now be ready for use.

## Usage Instructions

From the root directory, after confirming you've installed all prerequisites and set up the application, run:

    npm start
    
Users will are shown a menu with 8 options:
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role
- Quit

From here, users can select which action they would like to take to either view tables of relevant data from their organization or alter the system's data by creating new departments, roles, and employees, or by updating existing employees.

When the user is finished using the system, they may quit by selecting the "Quit" menu option.

## Demo
[![Demo](https://img.youtube.com/vi/v7O4YhTSWgQ/0.jpg)](https://www.youtube.com/watch?v=v7O4YhTSWgQ)

## Contributions

Contributions, issue requests, and feature requests are all welcomed.

## Questions

If you have any questions about this software or how to use it, please reach out to me:
- Will.o.berner@gmail.com
- [Will Berner](https://github.com/WillBerner)


&copy; 2021 [Will](https://github.com/WillBerner)
