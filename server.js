const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "ASc00lAS_@",
    database: "smartbrain",
  },
});

console.log(db.select("*").from("users"));

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(db.users);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

//// THIS IS THE PREVIOUSLY HARDCODED DATABASE FOR THE SERVER

// const database = {
//   users: [
//     {
//       id: "123",
//       name: "John",
//       email: "John@gmail.com",
//       password: "cookies",
//       entries: 0,
//       joined: new Date(),
//     },
//     {
//       id: "124",
//       name: "Sally",
//       email: "Sally@gmail.com",
//       password: "bananas",
//       entries: 0,
//       joined: new Date(),
//     },
//   ],
//   login: [
//     {
//       id: "987",
//       hash: " ",
//       email: "john@gmail.com",
//     },
//   ],
// };

////THIS IS FOR THE PREVIOUSLY HARDCODED SIGNIN ENDPOINT

//   bcrypt.compare(
//     "apples",
//     "$2a$10$VDw4nAVfWfY6AP/uL9wGa.F8MDbUA5EJYNB7g6tEZfyORcT7Vf3xe",
//     function (err, res) {
//       console.log("first guess", res);
//     }
//   );

//   bcrypt.compare(
//     "veggies",
//     "$2a$10$VDw4nAVfWfY6AP/uL9wGa.F8MDbUA5EJYNB7g6tEZfyORcT7Vf3xe",
//     function (err, res) {
//       console.log("second guess", res);
//     }
//   );

/////////////////////////////

// if (
//   req.body.email === database.users[0].email &&
//   req.body.password === database.users[0].password
// ) {
//   res.json(database.users[0]);
// } else {
//   res.status(400).json("error logging in");
// }
