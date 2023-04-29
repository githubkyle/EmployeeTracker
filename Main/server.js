const mysql = require("mysql2");
const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "",
      message: "",
      name: ""
    },
    {
      type: "",
      message: "",
      name: ""
    },
    {
      type: "",
      message: "",
      name: ""
    },
    {
      type: "",
      message: "",
      name: ""
    },
    {
      type: "",
      name: "",
      message: "",
      choices: [First, Second, Third]
    },
    {
      type: "",
      message: "",
      name: ""
    },
    {
      type: "",
      message: "",
      name: ""
    },
    {
      type: "",
      message: "",
      name: ""
    },
    {
      type: "",
      message: "",
      name: ""
    }
  ]);
};
