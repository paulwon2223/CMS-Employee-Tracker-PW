-- creating database --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- using the created database --
USE employees_db;


-- creating table called departments --
CREATE TABLE departments (
    id             INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_name  VARCHAR(30) NOT NULL
);

-- creating table called employee_roll --
CREATE TABLE employee_role (
    id              INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(30),
    salary          DECIMAL,
    department_id   INT,

    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

-- creating table called employee --
CREATE TABLE employee (
    id             INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name     VARCHAR(30) NOT NULL,   
    last_name      VARCHAR(30) NOT NULL,
    role_id        INT,
    manager_id     INT,

    FOREIGN KEY (role_id)
    REFERENCES employee_role(id)
    ON DELETE SET NULL,

    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
