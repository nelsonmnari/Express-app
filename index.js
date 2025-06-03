const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const  YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! iam here to stay");
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.methord} ${req.url}`);
  next();
});

//Routes
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.post("/contact", (req, res) => {
  res.send("Contact Page");
});

//Route Parameters
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Query Parameters
app.get("/search", (req, res) => {
  res.send(`Search Query: ${req.query.q}`);
});

// REST API

let users = [
  { id: 1, name: "Dedan" },
  { id: 2, name: "Doe" }
];

//CRUD - Create, Read, Update, Delete

// Create
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read
app.get("/users", (req, res) => {
  res.json(users);
});

//read one
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  res.json(user);
});

//update
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  user.name = req.body.name;
  res.json(user);
});

//delete
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).send();
}
);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
