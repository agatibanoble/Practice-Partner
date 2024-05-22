const Conference = require("../models/conferenceModel");
const Client = require("../models/clientModel");
// Create a new conference
const createConference = async (req, res) => {
  try {
    // Create a new instance of Conference
    const conference = await Conference.create(req.body);

    // Extract clientId from the request body
    const clientId = req.body.client;

    // Add the new contact person's id to the client's conferences array
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { $addToSet: { conferences: conference._id } },
      { new: true }
    );

    // console.log(updatedClient.conferences);
    res.status(201).json({
      success: true,
      message: "Contact Person created and linked successfully",
      data: { conference, updatedClient },
    });
  } catch (error) {
    console.error("Error creating contact person:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create contact person",
      error: error.message,
    });
  }
};

// Get all conferences
const getAllConferences = async (req, res) => {
  try {
    const conference = await Conference.find({
      client: req.params.clientId,
    })
      .populate({
        path: "client",
        model: "Client",
        options: { strictPopulate: true }, // Set strictPopulate based on your schema
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Coference retrieved successfully",
      data: conference,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch conference",
      error: error.message,
    });
  }
};

// Get a conference by ID
const getConferenceById = async (req, res) => {
  try {
    const conference = await Conference.find({
      client: req.params.clientId,
    })
      .populate({
        path: "client",
        model: "Client",
        options: { strictPopulate: true }, // Set strictPopulate based on your schema
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Coference retrieved successfully",
      data: conference,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch conference",
      error: error.message,
    });
  }
};

// Update a conference by ID
const updateConferenceById = async (req, res) => {
  try {
    const conferenceId = req.params.id;
    const updatedConference = await Conference.findByIdAndUpdate(
      conferenceId,
      req.body,
      { new: true }
    );
    if (!updatedConference) {
      return res.status(404).json({
        success: false,
        message: "Conference not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Conference updated successfully",
      data: updatedConference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update conference",
      error: error.message,
    });
  }
};

// Delete a conference by ID
const deleteConferenceById = async (req, res) => {
  try {
    const conferenceId = req.params.id;
    const deletedConference = await Conference.findByIdAndDelete(conferenceId);
    if (!deletedConference) {
      return res.status(404).json({
        success: false,
        message: "Conference not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Conference deleted successfully",
      data: deletedConference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete conference",
      error: error.message,
    });
  }
};

module.exports = {
  createConference,
  getAllConferences,
  getConferenceById,
  updateConferenceById,
  deleteConferenceById,
};
