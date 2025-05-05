const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
// const path = require("path");
const app = express();
const PORT = 9000;
//

mongoose
  .connect("mongodb://localhost:27017/contactDB")
  .then(() => console.log("database connted"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Home
app.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.render("home", { contacts });
});
//add new

app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/add", async (req, res) => {
  const { contactName, phone, email, tag, lastContacted } = req.body;
  await Contact.create({ contactName, phone, email, tag, lastContacted });
  res.redirect("/");
});
//edit
app.get("/edit/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("edit", { contact });
});
//update
app.post("/edit/:id", async (req, res) => {
  const { contactName, phone, email, tag, lastContacted } = req.body;
  await Contact.findByIdAndUpdate(req.params.id, {
    contactName,
    phone,
    email,
    tag,
    lastContacted,
  });
  res.redirect("/");
});
//delet
app.get("/delete/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
//port
app.listen(PORT, () => {
  console.log(`server running at : ${PORT}`);
});
