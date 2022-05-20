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
          "Delete Employee",
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
          addEmployee();

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

        case "Delete Employee":
          deleteEmployee();

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

    const employeeRoles = results.map((x) => ({
      name: x.title,
      value: x.department_id,
    }));

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
          choices: employeeRoles,
        },
        {
          message: "Please enter manager ID",
          name: "managerchoice",
          type: "list",
          choices: ["1", "2", "3", "4", "5"],
        },
      ])
      .then((data) => {
        const firstName = data.firstname;
        const lastName = data.lastname;
        const roleChoice = data.rolechoice;
        const managerChoice = data.managerchoice;

        const sql =
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";

        db.query(
          sql,
          [firstName, lastName, roleChoice, managerChoice],
          (err, results) => {
            if (err) throw err;
            console.log(
              `${firstName} ${lastName} successfully added to employee database`
            );
            initialQuestions();
          }
        );
      });
  });
};

const updateRole = () => {
  console.log(`
    ______________________________________
    |                                    |
    |        =================           |
    |     ** Updating Employee **        |
    |        =================           |
    |                                    |
    |____________________________________|
    `);

  const sql = "SELECT * FROM employee";

  db.query(sql, (err, results) => {
    if (err) throw err;

    const employee = results.map((x) => x.title);
  });
};

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
      // console.log(results.map((x) => x.department_name));
      const deparmentList = results.map((x) => ({
        name: x.department_name,
        value: x.id,
      }));
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
            type: "number",
          },
          {
            message: "Which department does the role belong to?",
            name: "roledepartment",
            type: "list",
            choices: deparmentList,
          },
        ])
        .then((data) => {
          console.log(data);
          const roles = data.newrole;
          const salary = data.salary;
          const choices = data.roledepartment;

          const sql =
            "INSERT INTO employee_role(title, salary, department_id) VALUES (?, ?, ?)";

          db.query(sql, [roles, salary, choices], (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${roles} successfully added employee roles!`);
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
          console.log(`${deparmentChoice} successfully added to departments`);
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

const deleteEmployee = () => {
  console.log(`
  ______________________________________
  |                                    |
  |         =================          |
  |      ** Deleting Employee **       |
  |         =================          |
  |                                    |
  |____________________________________|
  `);

  const sql = "SELECT first_name, last_name, CONCAT (first_name, ' ', last_name) full_name FROM employee ORDER BY full_name";

  db.query(sql, (err, results) => {
    if (err) throw err;

    // console.log(results.map((x) => x.full_name));
    // console.log(results);

    const employeeName = results.map((x) => ({
      name: x.full_name,
      value: x.id
    }));
    inq
      .prompt([
        {
          message: "Which employee would you like to remove?",
          name: "deleteEmployee",
          type: "list",
          choices: employeeName
        }
      ]).then((data) => {
        const removeEmployee = data.deleteEmployee;

        const sql = "DELETE FROM employee WHERE id=?"
        
        db.query(sql, [removeEmployee], (err, results) => {
          if (err) throw err;

          console.log(`${removeEmployee} has successfully been deleted from employee database`);
        })

      })
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
