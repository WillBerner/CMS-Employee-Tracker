USE cms_db;

INSERT INTO department (name)
VALUES ('Production'),
       ('Marketing'),
       ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES ('Project Manager', 100000.00, 1),
       ('Engineer', 80000.00, 1),
       ('Manager', 85000.00, 2),
       ('Sales Representative', 60000.00, 2),
       ('Assistant Accountant', 65000.00, 3),
       ('Account Manager', 85000.00, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Robertson', 1, null),
       ('John', 'Ragnarsson', 2, 1),
       ('Will', 'Berner', 2, 1),
       ('Sarah', 'Jones', 4, 2),
       ('Emily', 'Johnson', 3, null),
       ('Betty', 'Smith', 4, 2),
       ('Ahmed', 'Islam', 6, null),
       ('Tony', 'Hernandez', 5, 3);