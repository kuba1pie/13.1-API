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
  //sql.query(`SELECT * FROM users WHERE userId = ${userId}`, (err, res) => {
  sql.query(`SELECT name, lastname, DATE_FORMAT(birth, '%d-%m-%Y') AS birth, weight, height, gender, email, activity, age FROM users WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

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
    result(null, res);
  });
};

User.meals = (req, result) => {
  console.log(req.params.userId)
  sql.query(`SELECT meal, portion, name, kcal, protein, carbo, fat FROM meals WHERE userId = ${req.params.userId} AND date = "${req.params.date}" ORDER BY meal`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found meals for user: ", res);
      result(null, res);
      return;
    }

    result({
      kind: "not_found"
    }, null);
  });
};


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

User.updateById = (userId, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, name = ?, lastname = ?, weight = ?, height = ?, activity = ? WHERE userId = ?",
    [user.email, user.name, user.lastname, user.weight, user.height, user.activity, userId],
    (err, res) => {
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

      console.log("updated user: ", {
        userId: userId,
        ...user
      });
      result(null, {
        userId: userId,
        ...user
      });
    }
  );
};

module.exports = User;