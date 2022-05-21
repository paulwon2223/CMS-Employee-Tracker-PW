// requring the necessary directories
require("dotenv").config();
const mysql = require("mysql2");
const inq = require("inquirer");
const cTable = require("console.table"); 

// font colors for console
const cyanColor = "\x1b[36m%s\x1b[0m";
const redColor = "\x1b[31m";
const lineBreak = "\n";


// connecting to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employees_db"
});
db.connect(function (err) {
  if (err) {
    console.error("there is an error", err);
  } else {

    console.log(redColor, "Database is connected successfully!");
    // invoking main function
    initialQuestions();
  }
});

const welcomeTable = () => {
  console.log(cyanColor, `
  ______________________________________
  |                                    |
  |        ==================          |
  |      ** Employer Tracker **        |
  |        ==================          |
  |                                    |
  |____________________________________|

  
   `);
}

// initiates the "Employee Tracker Box" upon start
welcomeTable();

// asks first question and generates its own functions accordingly
const initialQuestions = () => {
  inq
    .prompt([
      {
        message: "What would you like to do?",
        name: "userChoice",
        type: "list",
        choices: [
          "View All Employees",
          "Add Employee",
          "Delete Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "Delete Role",
          "View All Departments",
          "Add Departments",
          "Delete Department",
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

        case "Delete Employee":
          deleteEmployee();

          break;

        case "Update Employee Role":
          updateRole();

          break;

        case "View All Roles":
          viewRoles();

          break;

        case "Add Role":
          addRole();

          break;

        case "Delete Role":
          deleteRole();

          break;

        case "View All Departments":
          viewDepartments();

          break;

        case "Add Departments":
          addDepartments();

          break;

        case "Delete Department":
          deleteDepartment();
          break;

        case "Quit":
          quit();

          break;
      }
    });
};




// ------------------------- VIEW FUNCTIONS ------------------------- //



// displays all employees
const viewEmployee = () => {
  console.log(cyanColor, `
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
    if (err) throw err;

    console.table(results);
    initialQuestions();
  });
};

// displays all the roles
const viewRoles = () => {
  console.log(cyanColor, `
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
    if (err) throw err;

    console.table(results);
    initialQuestions();
  });
};

// displays all departments
const viewDepartments = () => {
  console.log(cyanColor`
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
    if (err) throw err;

    console.table(results);
    initialQuestions();
  });
};




// ------------------------- ADD FUNCTIONS ------------------------- //

// adds new employee to emplyee table
const addEmployee = () => {
  console.log(cyanColor, `
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
              redColor, `${firstName} ${lastName} successfully added to employee database`
            );

           lineBreak;
            viewEmployee();
          }
        );
      });
  });
};

// adds new role to employee role table
const addRole = () => {
  console.log(cyanColor, `
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
              console.log(redColor, `${roles} successfully added employee roles!`);
              initialQuestions();
            }
          });
        });
    }
  });
};

// adds new department departments table
const addDepartments = () => {
  console.log(cyanColor, `
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
          console.log(redColor, `${deparmentChoice} successfully added to departments`);
          initialQuestions();
        }
      });
    });
};



// ------------------------- DELETE FUNCTIONS ------------------------- //

// deletes existing employee from employee table
const deleteEmployee = () => {
  console.log(cyanColor, `
  ______________________________________
  |                                    |
  |         =================          |
  |      ** Deleting Employee **       |
  |         =================          |
  |                                    |
  |____________________________________|
  `);

  const sql =
    "SELECT id, first_name, last_name, CONCAT (first_name, ' ', last_name) full_name FROM employee ORDER BY full_name";

  db.query(sql, (err, results) => {
    if (err) throw err;

    // console.log(results.map((x) => x.full_name));
    // console.log(results);

    const employeeName = results.map((x) => ({
      name: x.full_name,
      value: x.id,
    }));
    inq
      .prompt([
        {
          message: "Which employee would you like to remove?",
          name: "deleteEmployee",
          type: "list",
          choices: employeeName,
        },
      ])
      .then((data) => {
        const removeEmployee = data.deleteEmployee;

        const sql = "DELETE FROM employee WHERE id=?";

        db.query(sql, [removeEmployee], (err, results) => {
          if (err) throw err;

          console.log(redColor, `Employee successfully removed`);
          initialQuestions();
        });
      });
  });
};

// deletes existing role from employee role table
const deleteRole = () => {
  console.log(cyanColor, `
  ______________________________________
  |                                    |
  |         =================          |
  |       ** Deleting Role **          |
  |         =================          |
  |                                    |
  |____________________________________|
  `);
  const sql = "SELECT * FROM employee_role";

  db.query(sql, (err, results) => {
    if (err) throw err;

    const roleList = results.map((x) => ({
      name: x.title,
      value: x.id,
    }));
    inq
      .prompt([
        {
          message: "Which role would you like to delete?",
          name: "deleteRole",
          type: "list",
          choices: roleList,
        },
      ])
      .then((data) => {
        const removeRole = data.deleteRole;

        const sql = "DELETE FROM employee_role WHERE id=?";

        db.query(sql, [removeRole], (err, results) => {
          if (err) throw err;

          console.log(redColor, "Department successfully removed");
          initialQuestions();
        });
      });
  });
}

// deletes existing department from department table
const deleteDepartment = () => {
  console.log(cyanColor, `
  ______________________________________
  |                                    |
  |        ==================          |
  |     ** Deleting Department **      |
  |        ==================          |
  |                                    |
  |____________________________________|
  `);

  const sql = "SELECT * FROM departments";

  db.query(sql, (err, results) => {
    if (err) throw err;

    const departmentList = results.map((x) => ({
      name: x.department_name,
      value: x.id,
    }));
    inq
      .prompt([
        {
          message: "Which department would you like to delete?",
          name: "deleteDepartment",
          type: "list",
          choices: departmentList,
        },
      ])
      .then((data) => {
        const removeDepartment = data.deleteDepartment;

        const sql = "DELETE FROM departments WHERE id=?";

        db.query(sql, [removeDepartment], (err, results) => {
          if (err) throw err;

          console.log(redColor, "Department successfully removed");
          initialQuestions();
        });
      });
  });
};



// ------------------------- UPDATE FUNCTIONS ------------------------- //

// updates existing roles
const updateRole = () => {
  console.log(cyanColor, `
    ______________________________________
    |                                    |
    |        =================           |
    |     ** Updating Employee **        |
    |        =================           |
    |                                    |
    |____________________________________|
    `);

  const sql =
    "SELECT id, first_name, last_name, CONCAT (first_name, ' ', last_name) full_name FROM employee ORDER BY full_name";

  db.query(sql, (err, results) => {
    if (err) throw err;

    const removedName = results.map((x) => ({
      name: x.full_name,
      value: x.id,
    }));
    inq
      .prompt([
        {
          message: "Which employee would you like to update?",
          name: "updateEmployee",
          type: "list",
          choices: removedName,
        },
        {
          message: "Which update would you like to make?",
          name: "updateChoice",
          type: "list",
          choices: ["Update Salary", "Change Role"],
        },
      ])
      .then((data) => {});
  });
};


// -------------------------- QUIT FUNCTION ----------------------------- //

// ends the application
const quit = () => {
  console.log(cyanColor, `
    ______________________________________
    |                                    |
    |          ==============            |
    |         ** GOOD BYE!! **           |
    |          ==============            |
    |                                    |
    |____________________________________|
    `);
};
