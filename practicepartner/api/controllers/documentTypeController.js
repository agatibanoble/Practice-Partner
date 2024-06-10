const DocumentType = require("../models/documentTypeModel");

// Get all case categories
const getAllDocumentTypes = function (req, res) {
  DocumentType.find()
    .then((caseCategories) => {
      const successResponse = {
        success: true,
        message: "Document Types retrieved successfully",
        data: caseCategories,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error retrieving case categories",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Get a case category by ID
const getDocumentTypeById = function (req, res) {
  DocumentType.findById(req.params.id)
    .then((DocumentType) => {
      if (!DocumentType) {
        const errorResponse = {
          success: false,
          message: "DocumentType not found",
          data: null,
          error: "DocumentType not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "DocumentType retrieved successfully",
        data: DocumentType,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error retrieving case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Create a new case category
const createDocumentType = function (req, res) {
  const documentType = new DocumentType(req.body);

  documentType
    .save()
    .then((DocumentType) => {
      const successResponse = {
        success: true,
        message: "DocumentType created successfully",
        data: DocumentType,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error creating case category:", error);
      const errorResponse = {
        success: false,
        message: "Failed to create case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Update an existing case category
const updateDocumentTypeById = function (req, res) {
  DocumentType.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((DocumentType) => {
      if (!DocumentType) {
        const errorResponse = {
          success: false,
          message: "DocumentType not found",
          data: null,
          error: "DocumentType not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "DocumentType updated successfully",
        data: DocumentType,
        error: null,
      };
      res.json(successResponse);
    })
    .catch((error) => {
      console.error("Error updating case category:", error);
      const errorResponse = {
        success: false,
        message: "Failed to update case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

// Delete a case category by ID
const deleteDocumentTypeById = function (req, res) {
  DocumentType.findByIdAndDelete(req.params.id)
    .then((DocumentType) => {
      if (!DocumentType) {
        const errorResponse = {
          success: false,
          message: "DocumentType not found",
          data: null,
          error: "DocumentType not found",
        };
        return res.status(404).json(errorResponse);
      }
      const successResponse = {
        success: true,
        message: "DocumentType deleted successfully",
        data: DocumentType,
        error: null,
      };
      res.status(200).json(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        success: false,
        message: "There was an error deleting case category",
        data: null,
        error: error.message,
      };
      res.status(500).json(errorResponse);
    });
};

module.exports = {
  createDocumentType,
  updateDocumentTypeById,
  getAllDocumentTypes,
  getDocumentTypeById,
  deleteDocumentTypeById,
};
