// requring the necessary directories
const mysql = require('mysql2');
const inq = require('inquirer');
const cTable = require('console.table');

// connecting to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
);

// asks first question and generates its own functions accordingly
const initialQuestions = () => {
    inq.prompt([
        {
            message: 'What would you like to do? (use arrow keys)',
            name: 'userChoice',
            type: 'list',
            choices: [
                        'View All Employees',
                        'Add Employee',
                        'Update Employee Role',
                        'View All Roles',
                        'Add Role',
                        'View All Departments',
                        'Add Deparments',
                        'Quit'
                    ]
        }
    ]).then((data) => {
        const userData = data.userChoice;

        // switch statment to invoke certain function depending on user choice
        switch (userData) {
            case 'View All Employees':
                // viewEmployee();

            break;

            case 'Add Employee':
                // addEmployee();

            break;

            case 'Update Employee Role':
                // updateRole();

            break;

            case 'View All Roles':
                // viewRoles();

            break;

            case 'Add Role':
                // addRole();

            break;

            case 'View All Departments':
                // viewDepartments();
            break;

            case 'Add Departments':
                // addDepartments;
            break;
            
            case 'Quit':
                // quit();
            break;
        }

    })
}


initialQuestions();

// const viewEmployee = () => {
//     console.log('yay it also worked');
// }
