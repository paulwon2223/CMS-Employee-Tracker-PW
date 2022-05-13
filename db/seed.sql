INSERT INTO departments (department_name)
VALUES ('HR'),
       ('Engineering'),
       ('Marketing'),
       ('Sales'),
       ('Admin');


INSERT INTO employee_role (title, salary, department_id)
VALUES  ('Hiring Mananger', 80000, 1),
        ('Personnel Manager', 90000, 1),
        ('Junior Software Engineer', 100000, 2),
        ('Products Engineer', 120000, 2),
        ('Marketing Analyst', 75000, 3),
        ('Sales Associate', 60000, 4),
        ('Cusomter Service Representative', 60000, 4),
        ('Administrative Assistant', 55000, 5),
        ('Office clerk', 49000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Jalen', 'Brunson', 5, 1),
        ('Paul', 'Won', 2, NULL),
        ('Luka', 'Doncic', 1, 2),
        ('Spencer', 'Dinwiddie', 3, 3),
        ('Dwight', 'Powell', 4, 4),
        ('Maxi', 'Kleber', 4, 5),
        ('Tim', 'Hardaway', 4, NULL);