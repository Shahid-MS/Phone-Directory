const mysql = require("mysql2");
// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodesql",
  password: "root",
});

//Showing tables
// try {
//   connection.execute("Show tables", (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
// } catch (err) {
//   console.log("error : ", err);
// }

// Creating a table
// let q =
//   "CREATE TABLE User(id varchar(255) PRIMARY KEY, username varchar(100) NOT NULL, email varchar(50) NOT NULL UNIQUE, password varchar(100) NOT NULL, phone varchar(30) NOT NULL, avatar varchar(255))";
// try {
//   connection.execute(q, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
// } catch (err) {
//   console.log("error : ", err);
// }

//Inserting
// let q2 =
//   "INSERT INTO User(id, username, email, password, phone) VALUES ('2154038', 'Abhishek', 'abhi@gmail.com', 'abhi63', '9547264710')";
// try {
//   connection.execute(q2, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
// } catch (err) {
//   console.log("error : ", err);
// }

//display data

// let q3 = "SELECT * from User";
// try {
//   connection.execute(q3, (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     console.log(res[0].username);
//   });
// } catch (err) {
//   console.log("error : ", err);
// }

//for end the connection
connection.end();
