const sql = require("./db.js");

// constructor
const Meal = function (meal) {
  console.log('milll: ' + meal)

  this.userId = meal.userId;
  this.name = meal.name;
  this.portion = meal.portion;
  this.carbo = meal.carbo;
  this.kcal = meal.kcal;
  this.fat = meal.fat;
  this.protein = meal.protein;
  this.dishId = meal.dishId;
};

Meal.create = (newMeal, result) => {
  sql.query("INSERT INTO meals SET ?", newMeal, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created meal: ", {
      id: res.insertId,
      ...newMeal
    });
    result(null, {
      id: res.insertId,
      ...newMeal
    });
  });
};

Meal.findById = (mealId, result) => {
  sql.query(`SELECT * FROM meals WHERE id = ${mealId}`, (err, res) => {
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

    // not found User with the id
    result({
      kind: "not_found"
    }, null);
  });
};

Meal.getAll = result => {
  sql.query("SELECT * FROM meals", (err, res) => {
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

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
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

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

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

module.exports = Meal;