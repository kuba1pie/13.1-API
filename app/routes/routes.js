module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
  const users = require("../controllers/user.controller.js");
  const dishes = require("../controllers/dish.controller.js");

  // Create a new Item
  app.post("/customers", customers.create);
  app.post("/users", users.create);

  // Retrieve all Items
  app.get("/customers", customers.findAll);
  app.get("/users", users.findAll);
  app.get("/dishes", dishes.findAll);

  // Retrieve a single Item with ItemId
  app.get("/customers/:customerId", customers.findOne);
  app.get("/users/:userId", users.findOne);
  app.get("/dishes/:dishId", dishes.findOne);

  // Update a Item with ItemId
  app.put("/customers/:customerId", customers.update);
  //app.put("/users/:userId", users.update);

  // Delete a Item with ItemId
  app.delete("/customers/:customerId", customers.delete);
  //app.delete("/users/:userId", users.delete);

  // Delete all Items
  app.delete("/customers", customers.deleteAll);

};