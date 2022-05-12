-- creating database --
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- using the created database --
USE employees_db;


-- creating table called departments --
CREATE TABLE departments (
    id               INT         NOT NULL AUTO_INCREMENT,
    department_name  VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- creating table called employee_roll --
CREATE TABLE employee_role (
    id              INT         NOT NULL AUTO_INCREMENT,
    title           VARCHAR(30),
    salary          DECIMAL,
    department_id   INT,
    PRIMARY KEY(id)

    -- FOREIGN KEY (department_id)
    -- REFERENCES departments(id)
    -- ON DELETE SET NULL
);

-- creating table called employee --
CREATE TABLE employee (
    id             INT         NOT NULL AUTO_INCREMENT,
    first_name     VARCHAR(30) NOT NULL,   
    last_name      VARCHAR(30) NOT NULL,
    role_id        INT,
    manager_id     INT,
    PRIMARY KEY(id)

    -- FOREIGN KEY (role_id)
    -- REFERENCES employee_role(id)
    -- ON DELETE SET NULL,

    -- FOREIGN KEY (manager_id)
    -- REFERENCES employee(id)
    -- ON DELETE SET NULL
);
