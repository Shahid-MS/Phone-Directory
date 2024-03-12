const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodesql",
  password: "root",
});

function createRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
    faker.phone.number(),
    faker.image.avatar(),
  ];
}

let data = [];

for (let i = 0; i < 100; i++) {
  data.push(createRandomUser());
}

let q = "INSERT INTO User(id, username, email, password, phone, avatar) VALUES ?";
//[] pass an array in place of ? called placeholder
try {
  connection.query(q, [data], (err, res) => {
    if (err) throw err;
    console.log(res);
  });
} catch (err) {
  console.log(err);
}

connection.end();
