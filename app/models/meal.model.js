const sql = require("./db.js");

// constructor
const Meal = function (meal) {
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
  sql.query(`SELECT * FROM meals WHERE mealId = ${mealId}`, (err, res) => {
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

    // not found Meal with the id
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
    result(null, res);
  });
};

module.exports = Meal;