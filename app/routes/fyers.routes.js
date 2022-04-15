module.exports = (app) => {
  const fyersController = require("../controllers/fyers.controller.js");

  const router = require("express").Router();

  // Create a new Book
  router.post("/", fyersController.create);

  // Retrieve all Books
  router.get("/", fyersController.findAll);

  // Retrieve all published Books
  router.get("/published", fyersController.findAllPublished);

  // Retrieve a single Book with id
  router.get("/:id", fyersController.findOne);

  // Update a Book with id
  router.put("/:id", fyersController.update);

  // Delete a Book with id
  router.delete("/:id", fyersController.delete);

  // Delete all Books
  router.delete("/", fyersController.deleteAll);

  app.use("/api/fyers", router);
};
