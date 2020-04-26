const sql = require("./db.js");

// constructor
const Dish = function (dish) {
  this.name = dish.name;
  this.kcal = dish.kcal;
  this.fat = dish.fat;
  this.protein = dish.protein;
  this.carbo = dish.carbo;
};

Dish.create = (newDish, result) => {
  sql.query("INSERT INTO dishes SET ?", newDish, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created dish: ", {
      id: res.insertId,
      ...newDish
    });
    result(null, {
      id: res.insertId,
      ...newDish
    });
  });
};

Dish.findById = (dishId, result) => {
  sql.query(`SELECT * FROM dishes WHERE dishId = ${dishId}`, (err, res) => {
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

Dish.getAll = result => {
  sql.query("SELECT name, dishId, kcal, fat, protein, carbo FROM dishes ORDER BY name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("ddcustomers: ", res);
    result(null, res);
  });
};

Dish.list = result => {
  sql.query("SELECT name FROM dishes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("ddcustomers: ", res);
    result(null, res);
  });
};

Dish.updateById = (dishId, dish, result) => {
  sql.query(
    "UPDATE dishes SET name = ?, kcal = ?, protein = ?, carbo = ?, fat = ?, portion = ? WHERE dishId = ?",
    [dish.name, dish.kcal, dish.protein, dish.carbo, dish.fat, dish.portion, dishId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Dish with the id
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated dish: ", {
        dishId: dishId,
        ...dish
      });
      result(null, {
        dishId: dishId,
        ...dish
      });
    }
  );
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

module.exports = Dish;