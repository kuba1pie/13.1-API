module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const dishes = require("../controllers/dish.controller.js");
  const meals = require("../controllers/meal.controller.js");

  // Create a new Item
  app.post("/users", users.create);
  app.post("/meals", meals.create);
  app.post("/dishes", dishes.create);

  // Retrieve all Items
  app.get("/users", users.findAll);
  app.get("/dishes", dishes.findAll);
  app.get("/dishesList", dishes.List);
  app.get("/meals", meals.findAll);

  // Retrieve a single Item with ItemId
  app.get("/users/:userId", users.findOne);
  app.get("/dishes/:dishId", dishes.findOne);

  // Retrieve User Meals with userId and date
  app.get("/users/:userId/meals/:date", users.meals);
  app.get("/meals/:mealId", meals.findOne);


  // Update a Item with ItemId
  app.put("/users/:userId", users.update);
  app.put("/dishes/:dishId", dishes.update);

  // Delete a Item with ItemId
  app.delete("/users/:userId", users.delete);
  app.delete("/meals/:mealId", meals.delete);

  // Delete all Items
  //app.delete("/customers", customers.deleteAll);

};