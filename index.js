const express = require("express");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
  fs.readdir("./Files", (err, files) => {
    if (err) {
      alert(err);
    } else {
      res.render("index", { files: files });
      console.log("files " + " " + files);
    }
  });
});

// Create Task
app.post("/create_task", (req, res) => {
  fs.writeFile(
    `./Files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      if (err) {
        alert(err);
      } else {
        res.redirect("/");
      }
    }
  );
});

// Read Task
app.get("/showtask/:filename", (req, res) => {
  fs.readFile(`./Files/${req.params.filename}`, "utf-8", (err, data) => {
    res.render("show", {
      filename: req.params.filename,
      content: data,
    });
  });
});

// Edit File
app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./Files/${req.params.filename}`, "utf-8", (err, data) => {
    res.render("edit", {
      filename: req.params.filename,
      content: data,
    });
  });
});

app.post("/editFileSuccess/:filename", (req, res) => {
  fs.writeFile(`./Files/${req.params.filename}`, req.body.details2, (err) => {
    if (err) {
      alert(err);
    } else {
      res.redirect("/");
    }
  });
});

// delete file
app.get("/deleteFile/:filename", (req, res) => {
  fs.unlink(`./Files/${req.params.filename}`, (err) => {
    if (err) {
      alert(err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3000, () => {
  console.log("https://localhost:3000");
});
