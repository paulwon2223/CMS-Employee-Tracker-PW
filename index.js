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

db.connect(function(err) {
    if (err) {
        console.error('there is an error', err);
    } else {
        console.log('Database is connected successfully!')
        // invoking main function
        initialQuestions();
    }
});


// asks first question and generates its own functions accordingly
const initialQuestions = () => {
    inq.prompt([
        {
            message: 'What would you like to do?',
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
                viewEmployee();

            break;

            case 'Add Employee':
                addEmployee();

            break;

            case 'Update Employee Role':
                // updateRole();

            break;

            case 'View All Roles':
                viewRoles();

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
};

const viewEmployee = () => {
    const sql = "SELECT * FROM employee";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('there is an error', err)
        } else {
            console.table(results)
        }
    })
};

const addEmployee = () => {
    inq.prompt([
        {
            message: 'Enter first name',
            name: 'firstname',
            type: 'input'
        },
        {
            message: 'Enter last name',
            name: 'lastname',
            type: 'input'
        }
    ]).then((data) => {
        const firstName = data.firstname;
        const lastName =data.lastname;
        
        // the question marks serve as placeholders
        const sql = "INSERT INTO employee (first_name, last_name) VALUES (?,?)";

        db.query(sql, [firstName, lastName] ,(err, results) => {
            if (err) {
                console.log(err);
            } else {
                viewEmployee()
            }
        })
    })
};

const updateRole = () => {

}

const viewRoles = () => {
    const sql = "SELECT title FROM employee_role";

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results)
        }
    })
}