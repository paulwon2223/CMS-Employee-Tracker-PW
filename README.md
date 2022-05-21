### Homework Assignment #12: SQL Employee Tracker
-----------------------------
#### Overview:
- For this assignment, I was tasked in creating a **Content Management System (CMS)** interface which will allow users to easily navigate and interact with information stored in databases. Node.js, Inquirer, MySQL, Console.Table, and Dotenv were used in the process of creating the application

<br>

#### Installation:
- This application requires **Node.JS**
- To run application, first enter password in **Index.js** file to connect MySql
- Install necessary npm packages:
```md
    npm install
```
- Run schmea database, then seed:
```md
    mysql -u root -p
    source schema.sql
    source seed.sql
```
- Start application:
```md
    npm start || node index.js
```


<br>

#### Process:
- In the first steps of creating the application, the neccessary dependency **npm** packages (Inquirer, MySql, console.table, dotenv) were first installed  to the main index.js file. Furthermore, a **db** folder was created to store all the sql files that stored the data. 
- Tables listed 'Departments', 'Employee Role', and 'Employee' were created in the schema.sql file and the values for the tables were stored in the seed.sql file (data in file was preset for demonstration purpose).
- After connecting to the sql database, Inquirer was used to prompt a seires of questions that will ask user what they would like to do and according function ,depending on user choice, is invoked.
- Dotenv package was used to store my password in a .env file

<br>

#### Additional Documents:
- Link to walkthrough video: https://www.youtube.com/watch?v=2gh4F48w0X4
- Link to github Repo: https://github.com/paulwon2223/CMS-Employee-Tracker-PW

<br>

#### Contact:
- email: wonpaul2223@gmail.com
- github: https://github.com/paulwon2223