const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./students.db");

db.run(`
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  course TEXT
)
`);

app.get("/", (req, res) => {
  res.send("Project 3 Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.post("/students", (req, res) => {
  const { name, email, course } = req.body;

  db.run(
    "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
    [name, email, course],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send("Student Added Successfully");
    }
  );
});
app.get("/add", (req, res) => {
  db.run(
    "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
    ["Priya", "priya@gmail.com", "Full Stack"]
  );

  res.send("Student Added");
});
app.get("/students", (req, res) => {
  db.all("SELECT * FROM students", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});
app.get("/update", (req, res) => {
  db.run(
    "UPDATE students SET course=? WHERE id=?",
    ["Python Full Stack", 1],
    function(err) {
      if (err) return res.send(err.message);
      res.send("Student Updated");
    }
  );
});
app.get("/delete", (req, res) => {
  db.run(
    "DELETE FROM students WHERE id=?",
    [1],
    function(err) {
      if (err) return res.send(err.message);
      res.send("Student Deleted");
    }
  );
});