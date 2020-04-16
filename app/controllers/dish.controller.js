const Dish = require("../models/dish.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const dish = new Dish({
    name: req.body.name,
    surname: req.body.surname,
    birth: req.body.birth,
    weight: req.body.weight,
    height: req.body.height,
  });

  // Save User in the database
  Dish.create(dish, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Dish.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
// Retrieve all Users from the database.
exports.List = (req, res) => {
  Dish.list((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
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