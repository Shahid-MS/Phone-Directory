const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const methodOverride = require("method-override");
const { faker } = require("@faker-js/faker");

const app = express();

//View
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Using post and other methods
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//set folder
app.use(express.static(path.join(__dirname, "Public")));

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodesql",
  password: "root",
});

let port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

//all contacts
app.get("/contacts", async (req, res) => {
  try {
    let q = "SELECT * from user";
    connection.query(q, (err, result) => {
      if (err) throw err;
      let contacts = result;
      // console.log(contacts);
      res.render("contacts.ejs", { contacts });
    });
  } catch (err) {
    console.log(err);
    res.send("some error with DB");
  }
});

//particular contacts
app.get("/contacts/:id", (req, res) => {
  // console.log(req.params);
  let { id } = req.params;
  // console.log(id);

  let q = `SELECT * from User WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      if (result.length == 0) {
        res.send(`Contact with ${id} not available in database`);
      } else {
        let contact = result[0];
        if (contact.avatar == null || contact.avatar.length == 0) {
          contact.avatar = "https://www.svgrepo.com/show/169986/avatar.svg";
        }
        // console.log(contact.avatar, typeof contact.avatar);
        res.render("contact", { contact });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database");
  }
});

//Add Contact
app.get("/contacts/add/new", (req, res) => {
  res.render("addNew.ejs");
});

app.post("/contacts", (req, res) => {
  // console.log(req.body);
  let { username, email, phone, avatar, password } = req.body;
  let id = faker.string.uuid();
  let contact = [[id, username, email, password, phone, avatar]];
  let q = "INSERT INTO user VALUES ? ";
  try {
    connection.query(q, [contact], (err, result) => {
      if (err) throw err;
      // console.log(result);
    });
  } catch (error) {
    console.log(err);
  }
  res.redirect("/contacts");
});

//Update Posts
app.get("/contacts/update/:id", (req, res) => {
  let { id } = req.params;

  let q = `SELECT * from user where id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      if (result.length == 0) {
        res.send(`Contact with ${id} not available in database`);
      } else {
        let contact = result[0];
        // console.log(contact);
        res.render("updateForm.ejs", { contact });
      }
    });
  } catch (error) {
    console.log(err);
    res.send("Some error in database");
  }
});

app.patch("/contacts/:id", (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let { email, phone, avatar, password } = req.body;
  let q = `SELECT password FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      let userPassword = result[0].password;
      // console.log(userPassword);
      if (password != userPassword) {
        res.send("Wrong Password");
      } else {
        let q2 = `UPDATE user set email = '${email}', phone = '${phone}', avatar = '${avatar}' WHERE id = '${id}'`;
        try {
          connection.query(q2, (err, result) => {
            if (err) throw err;
            // console.log(result);
            res.redirect("/contacts");
          });
        } catch (err) {
          console.log(err);
          res.send("Some error in database");
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database");
  }
});

app.delete("/contacts/:id", (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let q = `DELETE FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.redirect("/contacts");
    });
  } catch (error) {
    console.log(err);
    res.send("Some error in database");
  }
});
