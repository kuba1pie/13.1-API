const Meal = require("../models/meal.model.js");

// Create and Save a new Meal
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Meal
  const meal = new Meal({
    userId: req.body.userId,
    name: req.body.name,
    kcal: req.body.kcal,
  });
  // Save Meal in the database
  Meal.create(meal, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Meal."
      });
    else res.send(data);
  });
};

// Retrieve all Meals from the database.
exports.findAll = (req, res) => {
  Meal.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Meal.findById(req.params.mealId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meal with id ${req.params.mealId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Meal with id " + req.params.mealId
        });
      }
    } else res.send(data);
  });
};


// Delete a Meal with the specified mealId in the request
exports.delete = (req, res) => {
  Meal.remove(req.params.mealId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meal with id ${req.params.mealId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Meal with id " + req.params.mealId
        });
      }
    } else res.send({
      message: `Meal was deleted successfully!`
    });
  });
};