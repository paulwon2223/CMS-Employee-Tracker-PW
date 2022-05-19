// requring the necessary directories
require("dotenv").config();
const mysql = require("mysql2");
const inq = require("inquirer");
const cTable = require("console.table");

// connecting to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employees_db",
});

db.connect(function (err) {
  if (err) {
    console.error("there is an error", err);
  } else {
    console.log("Database is connected successfully!");
    // invoking main function
    initialQuestions();
  }
});

// asks first question and generates its own functions accordingly
const initialQuestions = () => {
  console.log(`
    ______________________________________
    |                                    |
    |        ==================          |
    |      ** Employer Tracker **        |
    |        ==================          |
    |                                    |
    |____________________________________|
    `);
  inq
    .prompt([
      {
        message: "What would you like to do?",
        name: "userChoice",
        type: "list",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Departments",
          "Quit",
        ],
      },
    ])
    .then((data) => {
      const userData = data.userChoice;

      // switch statment to invoke certain function depending on user choice
      switch (userData) {
        case "View All Employees":
          viewEmployee();

          break;

        case "Add Employee":
          //   addEmployee();

          break;

        case "Update Employee Role":
          // updateRole();

          break;

        case "View All Roles":
          viewRoles();

          break;

        case "Add Role":
          addRole();

          break;

        case "View All Departments":
          viewDepartments();

          break;

        case "Add Departments":
          addDepartments();

          break;

        case "Quit":
          quit();

          break;
      }
    });
};

// displays all the employees
const viewEmployee = () => {
  console.log(`
    ______________________________________
    |                                    |
    |         ================           |
    |      ** Viewing Employee **        |
    |         ================           |
    |                                    |
    |____________________________________|
    `);

  const sql = "SELECT * FROM employee";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("there is an error", err);
    } else {
      console.table(results);
      initialQuestions();
    }
  });
};

// adding an employee
const addEmployee = () => {
  console.log(`
    ______________________________________
    |                                    |
    |         ================           |
    |        ** Add Employee **          |
    |         ================           |
    |                                    |
    |____________________________________|
    `);

  const sql = "SELECT * FROM employee_role";

  db.query(sql, (err, results) => {
    if (err) throw err;

    console.log(results.map((x) => x.title));
    const roles = results.map((x) => x.title);

    inq
      .prompt([
        {
          message: "Enter employee first name",
          name: "firstname",
          type: "input",
        },
        {
          message: "Enter employee last name",
          name: "lastname",
          type: "input",
        },
        {
          message: "Please select a role for employee",
          name: "rolechoice",
          type: "list",
          choices: roles,
        },
        {
          message: "Please enter manager ID",
          name: "managerchoice",
          type: "list",
          choices: ["None", "1", "2", "3", "4", "5"],
        },
      ])
      .then((data) => {
        const firstName = data.firstname;
        const lastName = data.lastname;
        const roleChoice = data.rolechoice;
        const managerChoice = data.managerchoice;

        const sql = "INSERT INTO";
      });
  });
};

// const updateRole = () => {

// }

// displays all the roles
const viewRoles = () => {
  console.log(`
    ______________________________________
    |                                    |
    |         ================           |
    |        ** Viewing Roles **         |
    |         ================           |
    |                                    |
    |____________________________________|
    `);

  const sql = "SELECT id, title, salary FROM employee_role";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      initialQuestions();
    }
  });
};

// adds role to the list of roles
const addRole = () => {
  console.log(`
    ______________________________________
    |                                    |
    |         ================           |
    |        ** Adding Roles **          |
    |         ================           |
    |                                    |
    |____________________________________|
    `);

  const sql = "SELECT * FROM departments";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results.map((x) => x.department_name));
      const deparmentList = results.map((x) => x.department_name);
      inq
        .prompt([
          {
            message: "Please enter employer role",
            name: "newrole",
            type: "input",
          },
          {
            message: "Please enter the salary",
            name: "salary",
            type: "input",
          },
          {
            message: "Which department does the role belong to?",
            name: "roledepartment",
            type: "list",
            choices: deparmentList,
          },
        ])
        .then((data) => {
          const roles = data.newrole;
          const salary = data.salary;
          const choices = data.roledepartment;

          const sql =
            "INSERT INTO employee_role(title, salary, department_id) VALUES (?, ?, ?)";

          db.query(sql, [roles, salary, choices], (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Success");
              viewRoles();
              initialQuestions();
            }
          });
        });
    }
  });
};

// adds department to list of departments
const addDepartments = () => {
    console.log(`
    ______________________________________
    |                                    |
    |       ====================         |
    |     ** Adding Departments **       |
    |       ====================         |
    |                                    |
    |____________________________________|
    `);

  inq
    .prompt([
      {
        message: "Which department would you like to add?",
        name: "departmentchoices",
        type: "input",
      },
    ])
    .then((data) => {
      const deparmentChoice = data.departmentchoices;

      const sql = "INSERT INTO departments (department_name) VALUES (?)";

      db.query(sql, [deparmentChoice], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Department successfully added!");
          viewDepartments();
          initialQuestions();
        }
      });
    });
};

// displays all departments
const viewDepartments = () => {
    console.log(`
    ______________________________________
    |                                    |
    |         ===============            |
    |        ** DEPARTMENTS **           |
    |         ===============            |
    |                                    |
    |____________________________________|
    `);

  const sql = "SELECT * FROM departments";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
      initialQuestions();
    }
  });
};

// ends the application
const quit = () => {
  console.log(`
    ______________________________________
    |                                    |
    |          ==============            |
    |         ** GOOD BYE!! **           |
    |          ==============            |
    |                                    |
    |____________________________________|
    `);
};
