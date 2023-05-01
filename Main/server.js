const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.DB_password,
    database: "employees_db"
  },
  console.log(`Connected to the database.`)
);

function ViewAllDeps() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function ViewAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function ViewAllEmps() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function AddADep(input) {
  const sql = `INSERT INTO department (name) VALUES ("${input}")`;
  db.query(sql, [input], (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function AddARole(id, title, salary, dep) {
  db.query(
    `INSERT INTO role (id, title, salary, department_id) VALUES ((${id}),("${title}"),(${salary}),(${dep}))`,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
    }
  );
}

function AddAnEmp(id, fName, lName, role, manager) {
  db.query(
    `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${id}, "${fName}", "${lName}", ${role}, ${manager})`,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
    }
  );
}

function UpEmpRole(role, id) {
  db.query(
    `UPDATE employee SET role_id = ${role} WHERE id = ${id}`,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
    }
  );
}

const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choices",
    choices: [
      {
        name: "View all Departments",
        value: "View all Departments"
      },
      {
        name: "View all roles",
        value: "View all roles"
      },
      {
        name: "View all employees",
        value: "View all employees"
      },
      {
        name: "Add a department",
        value: "Add a department"
      },
      {
        name: "Add a role",
        value: "Add a role"
      },
      {
        name: "Add an employee",
        value: "Add an employee"
      },
      {
        name: "Update an employee role",
        value: "Update an employee role"
      },
      {
        type: "confirm",
        message: "All finished?",
        name: "Finished"
      }
    ]
  },
  {
    type: "input",
    message: "What is the name of the new department you want to create?",
    name: "NewDep",
    when: answers => answers.choices === "Add a department"
  },
  {
    type: "input",
    message: "What will the ID be of the new role you want to add?",
    name: "NewRoleId",
    when: answers => answers.choices === "Add a role"
  },
  {
    type: "input",
    message: "What will the title be of the new role you want to add?",
    name: "NewRoleTitle",
    when: answers => answers.choices === "Add a role"
  },
  {
    type: "input",
    name: "NewRoleSal",
    message: "What salary will be given to this new role?",
    when: answers => answers.choices === "Add a role"
  },
  {
    type: "input",
    message: "Which department number will this be assigned to?",
    name: "NewRoleDept",
    when: answers => answers.choices === "Add a role"
  },
  {
    type: "input",
    message: "What employee ID will this new employee be given?",
    name: "EmpID",
    when: answers => answers.choices === "Add an employee"
  },
  {
    type: "input",
    message: "What's the first name of this new worker?",
    name: "EmpF",
    when: answers => answers.choices === "Add an employee"
  },
  {
    type: "input",
    message: "What's the last name of this new worker?",
    name: "EmpL",
    when: answers => answers.choices === "Add an employee"
  },
  {
    type: "input",
    message: "What role ID is assigned to this new worker?",
    name: "EmpR",
    when: answers => answers.choices === "Add an employee"
  },
  {
    type: "input",
    message: "What manager ID is assigned to this new worker?",
    name: "EmpM",
    when: answers => answers.choices === "Add an employee"
  },
  {
    type: "input",
    message: "Which worker would you like to update?",
    name: "UEmpID",
    when: answers => answers.choices === " Update an employee role"
  },
  {
    type: "input",
    message: "What new role would you like to place them into?",
    name: "UEmpR",
    when: answers => answers.choices === " Update an employee role"
  }
];

// const promptUser = () => {
//   return inquirer.prompt([
//   {
//     type: "list",
//     message: "What would you like to do?",
//     name: "choices",
//     choices: [
//       {
//         name: "View all Departments",
//         value: "View all Departments"
//       },
//       {
//         name: "View all roles",
//         value: "View all roles"
//       },
//       {
//         name: "View all employees",
//         value: "View all employees"
//       },
//       {
//         name: "Add a department",
//         value: "Add a department"
//       },
//       {
//         name: "Add a role",
//         value: "Add a role"
//       },
//       {
//         name: "Add an employee",
//         value: "Add an employee"
//       },
//       {
//         name: "Update an employee role",
//         value: "Update an employee role"
//       }
//     ]
//   },
//   {
//     type: "input",
//     message: "What is the name of the new department you want to create?",
//     name: "NewDep",
//     when: answers => answers.choices === "Add a department"
//   },
//   {
//     type: "input",
//     message: "What will the ID be of the new role you want to add?",
//     name: "NewRoleId",
//     when: answers => answers.choices === "Add a role"
//   },
//   {
//     type: "input",
//     message: "What will the title be of the new role you want to add?",
//     name: "NewRoleTitle",
//     when: answers => answers.choices === "Add a role"
//   },
//   {
//     type: "input",
//     name: "NewRoleSal",
//     message: "What salary will be given to this new role?",
//     when: answers => answers.choices === "Add a role"
//   },
//   {
//     type: "input",
//     message: "Which department number will this be assigned to?",
//     name: "NewRoleDept",
//     when: answers => answers.choices === "Add a role"
//   },
//   {
//     type: "input",
//     message: "What employee ID will this new employee be given?",
//     name: "EmpID",
//     when: answers => answers.choices === "Add an employee"
//   },
//   {
//     type: "input",
//     message: "What's the first name of this new worker?",
//     name: "EmpF",
//     when: answers => answers.choices === "Add an employee"
//   },
//   {
//     type: "input",
//     message: "What's the last name of this new worker?",
//     name: "EmpL",
//     when: answers => answers.choices === "Add an employee"
//   },
//   {
//     type: "input",
//     message: "What role ID is assigned to this new worker?",
//     name: "EmpR",
//     when: answers => answers.choices === "Add an employee"
//   },
//   {
//     type: "input",
//     message: "What manager ID is assigned to this new worker?",
//     name: "EmpM",
//     when: answers => answers.choices === "Add an employee"
//   },
//   {
//     type: "input",
//     message: "Which worker would you like to update?",
//     name: "UEmpID",
//     when: answers => answers.choices === " Update an employee role"
//   },
//   {
//     type: "input",
//     message: "What new role would you like to place them into?",
//     name: "UEmpR",
//     when: answers => answers.choices === " Update an employee role"
//   }
// ]);
// };

// const doingThings = ({
//   NewDep,
//   NewRoleId,
//   NewRoleTitle,
//   NewRoleSal,
//   NewRoleDept,
//   EmpID,
//   EmpF,
//   EmpL,
//   EmpR,
//   EmpM,
//   UEmpID,
//   UEmpR
// }) =>
// switch (answers.choices) {
//   case "View all Departments":
//     ViewAllDeps();
//     break;
//   case "View all roles":
//     ViewAllRoles();
//     break;
//   case "View all employees":
//     ViewAllEmps();
//     break;
//   case "Add a department":
//     AddADep(NewDep);
//     break;
//   case "Add a role":
//     AddARole(NewRoleId, NewRoleTitle, NewRoleSal, NewRoleDept);
//     break;
//   case "Add an employee":
//     AddAnEmp(EmpID, EmpF, EmpL, EmpR, EmpM);
//     break;
//   case "Update an employee role":
//     UpEmpRole(UEmpID, UEmpR);
//     break;
//   default:
//     console.log("Sorry, make another selection.");
//     break;
// };

const promptUser = questions => {
  return inquirer.prompt(questions).then(answers => {
    switch (answers.choices) {
      case "View all Departments":
        ViewAllDeps();
        break;
      case "View all roles":
        ViewAllRoles();
        break;
      case "View all employees":
        ViewAllEmps();
        break;
      case "Add a department":
        AddADep(answers.NewDep);
        break;
      case "Add a role":
        AddARole(
          answers.NewRoleId,
          answers.NewRoleTitle,
          answers.NewRoleSal,
          answers.NewRoleDept
        );
        break;
      case "Add an employee":
        AddAnEmp(
          answers.EmpID,
          answers.EmpF,
          answers.EmpL,
          answers.EmpR,
          answers.EmpM
        );
        break;
      case "Update an employee role":
        UpEmpRole(answers.UEmpID, answers.UEmpR);
        break;
      case "Finished":
        return;
      default:
        console.log("Sorry, make another selection.");
        break;
    }
  });
};

const init = () => {
  promptUser(questions)
    // .then(() => )
    .catch(err => console.error(err));
};

init();
