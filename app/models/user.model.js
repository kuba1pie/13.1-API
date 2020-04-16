const sql = require("./db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.lastname = user.lastname;
  this.birth = user.birth;
  this.weight = user.weight;
  this.height = user.height;
  this.age = user.age;
  this.bmi = user.bmi;
  this.email = user.email;
  this.gender = user.gender;
  this.activity = user.activity;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", {
      id: res.insertId,
      ...newUser
    });
    result(null, {
      id: res.insertId,
      ...newUser
    });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      //result(null, res[0]);
      result(null, res);
      return;
    }

    // not found User with the id
    result({
      kind: "not_found"
    }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("ddcustomers: ", res);
    result(null, res);
  });
};

/* Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};
*/
User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE userId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted user with userId: ", id);
    result(null, res);
  });
};
/*
Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
}; */

module.exports = User;