const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
// const path = require("path");
const app = express();
const PORT = 7000;
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
  let contacts = await Contact.find();

  contacts.sort((a, b) =>
    a.contactName.toLowerCase().localeCompare(b.contactName.toLowerCase())
  );

  res.render("home", { contacts, more: false });
});

//add new

app.get("/add", (req, res) => {
  res.render("add", { contact: { lastContacted: new Date() } });
});

app.post("/add", async (req, res) => {
  const { contactName, phone, email, tag, lastContacted,ty } = req.body;
  await Contact.create({ contactName, phone, email, tag,  lastContacted: new Date(lastContacted)});

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
    lastContacted: new Date(lastContacted)
  });
  res.redirect("/");
});
//delet
app.get("/delete/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
// Deleting multiple contacts based on IDs passed as query parameters
app.get("/delete-multiple", async (req, res) => {
  const contactIds = req.query.ids.split(','); // Get array of IDs from the query string
  if (contactIds.length > 0) {
    // Delete the contacts from the database
    await Contact.deleteMany({ _id: { $in: contactIds } });
    res.redirect("/");  // Redirect back to the main page after deletion
  } else {
    res.redirect("/");  // Or show an error message if no IDs were passed
  }
});

//port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running at : ${PORT}`);
});
