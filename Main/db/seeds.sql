INSERT INTO department ( name)
VALUES ("Finance"),
       ("Coding"),
       ("Fishing");

INSERT INTO role (id, title, salary, department_id)
VALUES (377, "Chief of fishing", 5000, 3),
       (60000, "Code tester", 4000, 2),
       (666, "Money counter", 6000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Johnny", "Shandito", 76, 89),
       (678, "Lazy", "Guy", 21, 12),
       (22, "Jim","Umbridge", 42, 43);