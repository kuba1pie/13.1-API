const Dish = require("../models/dish.model.js");

// Create and Save a new Dish
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Dish
  const dish = new Dish({
    name: req.body.name,
    kcal: req.body.kcal,
    portion: req.body.portion,
    protein: req.body.portion,
    carbo: req.body.carbo,
    fat: req.body.fat,
  });

  // Save Dish in the database
  Dish.create(dish, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all Dishes from the database.
exports.findAll = (req, res) => {
  Dish.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
// Retrieve all Dishes from the database.
exports.List = (req, res) => {
  Dish.list((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Dish with a customerId
exports.findOne = (req, res) => {
  Dish.findById(req.params.dishId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.dishId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.dishId
        });
      }
    } else res.send(data);
  });
};

// Update a Dish identified by the dishId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //console.log(req.body);

  Dish.updateById(
    req.params.dishId,
    new Dish(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Dish with id ${req.params.dishId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Dish with id " + req.params.dishId
          });
        }
      } else res.send(data);
    }
  );
};