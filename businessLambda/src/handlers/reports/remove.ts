import { connectToDatabase } from "../../db-connection";
import { Reports } from "../../models/reports.model";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  try {
    // Assuming the object ID is passed as a query parameter in the event object
    const { id } = event.queryStringParameters;

    // Check if the ID is valid before proceeding with the deletion
    if (!isValidObjectId(id)) {
      return {
        statusCode: 400, // Bad Request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Invalid object ID",
        }),
      };
    }

    // Find the job post by its object ID
    const reportedUser = await Reports.findById(id);

    if (!reportedUser) {
      return {
        statusCode: 404, // Not Found
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "No reported user found with the given object ID",
        }),
      };
    }

    // Delete the job post
    await reportedUser.deleteOne();

    return {
      statusCode: 200, // OK
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Reported user removed Successfully",
        deletedJobPost: reportedUser,
      }),
    };
  } catch (error) {
    console.error("Error deleting job post:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "An error occurred while trying to remove reported " }),
    };
  }
};

// Helper function to check if an ID is a valid MongoDB ObjectID
function isValidObjectId(id) {
  const { ObjectId } = require("mongoose").Types;
  return ObjectId.isValid(id);
}
