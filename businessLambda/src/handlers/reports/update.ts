import { connectToDatabase } from "../../db-connection";
import { Reports} from "../../models/reports.model";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  try {
    // Assuming the object ID is passed as a query parameter in the event object
    const { id } = event.queryStringParameters;

    // Check if the ID is valid before proceeding with the update
    if (!isValidObjectId(id)) {
      return {
        statusCode: 400, // Bad Request
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          message: "Invalid object ID",
        },
      };
    }

    // Find the job post by its object ID
    let reports = await Reports.findById(id);

    if (!reports) {
      return {
        statusCode: 404, // Not Found
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          message: "No reported user found with the given object ID",
        },
      };
    }

    const requestBody = JSON.parse(event.body)
    // Update the job post with new data
    const { name, status, avatar, identityNo } = requestBody;
    

    // Apply the changes
    reports.name= name|| reports.name;
    reports.status = status || reports.status;
    reports.avatar = avatar|| reports.avatar;
    reports.identityNo = identityNo|| reports.identityNo;
   

    // Save the updated job post to the database
    const updatedReports = await reports.save();

    return {
      statusCode: 200, // OK
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Reports Updated Successfully",
        updatedReports,
      }),
    };
  } catch (error) {
    console.error("Error updating reports:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error updating Reported User" }),
    };
  }
};

// Helper function to check if an ID is a valid MongoDB ObjectID
function isValidObjectId(id) {
  const { ObjectId } = require("mongoose").Types;
  return ObjectId.isValid(id);
}
