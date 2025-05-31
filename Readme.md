
# 📒 Contact Manager — Full Stack Project Documentation (`topic.md`)

---

## ✅ Technologies Used

- **Node.js** — server environment
- **Express.js** — web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM for schema definition and queries
- **EJS** — Embedded JavaScript templates for frontend views
- **Body-parser** — Middleware to parse form data

---

## 🧱 Project Structure

```
contact-manager/
├── models/
│   └── contact.js        # Mongoose schema for contacts
├── public/
│   └── style.css         # Custom CSS (optional)
├── routes/
│   └── index.js          # All route handlers (GET, POST, etc.)
├── views/
│   ├── add.ejs           # Form to add a new contact
│   ├── edit.ejs          # Form to edit a contact
│   └── home.ejs          # Main view to display all contacts
├── index.js              # Entry point of the app
├── package.json          # Node dependencies
└── .env                  # Environment variables (like DB URI)
```

---

## 🧩 Mongoose Model

**File**: `models/contact.js`

```js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Contact', contactSchema);
```

---

## 🌐 Routes Breakdown

**File**: `routes/index.js`

### 🏠 GET `/` — View All Contacts

- **Purpose**: Show the homepage with a list of saved contacts.
- **Logic**:
  ```js
  Contact.find().then((contacts) => {
    res.render('home', { contacts });
  });
  ```

### ➕ GET `/add` — Add Contact Form

- **Purpose**: Show an HTML form to enter new contact details.
- **Logic**:
  ```js
  res.render('add');
  ```

### 📝 POST `/add` — Save New Contact

- **Purpose**: Add a new contact to the database.
- **Logic**:
  ```js
  const contact = new Contact(req.body);
  contact.save().then(() => res.redirect('/'));
  ```

### ✏️ GET `/edit/:id` — Edit Contact Form

- **Purpose**: Load a specific contact’s data into the edit form.
- **Logic**:
  ```js
  Contact.findById(req.params.id).then((contact) => {
    res.render('edit', { contact });
  });
  ```

### 🔁 POST `/edit/:id` — Update Contact

- **Purpose**: Update contact info in the database.
- **Logic**:
  ```js
  Contact.findByIdAndUpdate(req.params.id, req.body).then(() => res.redirect('/'));
  ```

### ❌ GET `/delete/:id` — Delete Contact

- **Purpose**: Remove a contact by its ID.
- **Logic**:
  ```js
  Contact.findByIdAndDelete(req.params.id).then(() => res.redirect('/'));
  ```

---

## 📄 Views (EJS Templates)

1. **`home.ejs`** — Displays all contacts in a table with "Edit" and "Delete" buttons.
2. **`add.ejs`** — Contains a form with input fields: `name`, `email`, `phone`.
3. **`edit.ejs`** — Similar to `add.ejs`, but pre-filled with contact data for editing.

---

## ⚙️ Middleware & Config

**File**: `index.js`

```js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI);
app.use('/', require('./routes/index'));
```

---

## 🧪 CRUD Flow Summary

| Feature         | Route         | Method | View      | Action                                     |
|----------------|---------------|--------|-----------|--------------------------------------------|
| Show contacts  | `/`           | GET    | `home.ejs`| List all contacts                          |
| Add contact    | `/add`        | GET    | `add.ejs` | Form to add new contact                    |
| Save contact   | `/add`        | POST   | Redirect  | Save to DB and redirect                    |
| Edit contact   | `/edit/:id`   | GET    | `edit.ejs`| Pre-fill form with contact data            |
| Update contact | `/edit/:id`   | POST   | Redirect  | Save updates to DB                         |
| Delete contact | `/delete/:id` | GET    | Redirect  | Delete contact from DB and redirect        |

---

## 🛡️ Optional Enhancements

- Add input validation (e.g. using `express-validator`)
- Use flash messages for feedback
- Add Bootstrap for improved UI
- Convert GET `/delete/:id` to DELETE with JS/AJAX for RESTful compliance
