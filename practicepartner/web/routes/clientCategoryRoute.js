// Import necessary modules
const express = require("express");
const router = express.Router();
const clientCategoryController = require("../Controllers/clientCategoryController");

// Route to get  clientCategorys with pagination and search
router.get("/getClientCategorys", clientCategoryController.getClientCategorys);

// Route to get all clientCategorys
router.get(
  "/getAllClientCategorys",
  clientCategoryController.getAllClientCategorys
);

// Route to get a clientCategory by ID
router.get(
  "/getClientCategoryById/:id",
  clientCategoryController.getClientCategoryById
);

// Route to create a new clientCategory
// router.post("/createClientCategory", clientCategoryController.createClientCategory);
router.post(
  "/saveClientCategory/",
  clientCategoryController.saveClientCategory
);
// Route to update a clientCategory by ID
// router.put("/updateClientCategory/:id", clientCategoryController.updateClientCategory);

// Route to delete a clientCategory by ID
router.delete(
  "/deleteClientCategory/:id",
  clientCategoryController.deleteClientCategory
);

// Route to render the clientCategory form for creating a new clientCategory
router.get(
  "/addClientCategory",
  clientCategoryController.renderNewClientCategoryForm
);

// Route to render the clientCategory form for editing an existing clientCategory
router.get(
  "/editClientCategory/:id",
  clientCategoryController.renderEditClientCategoryForm
);
// Route to render the clientCategory form for editing an existing clientCategory
router.get(
  "/listClientCategorys/",
  clientCategoryController.renderClientCategoryList
);

router.get("/getData/", clientCategoryController.getData);
module.exports = router;
