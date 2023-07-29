import { connectToDatabase } from "../../db-connection";
import { Posts } from "../../models/jobpost.model";

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
    let jobPost = await Posts.findById(id);

    if (!jobPost) {
      return {
        statusCode: 404, // Not Found
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          message: "No job post found with the given object ID",
        },
      };
    }

    const requestBody = JSON.parse(event.body)
    // Update the job post with new data
    const { title, description, company, applicants, reference } = requestBody
    

    // Apply the changes
    jobPost.title = title || jobPost.title;
    jobPost.description = description || jobPost.description;
    jobPost.company = company|| jobPost.company;
    jobPost.applicants = applicants|| jobPost.applicants;
    jobPost.reference =reference|| jobPost.reference;

    // Save the updated job post to the database
    const updatedJobPost = await jobPost.save();

    return {
      statusCode: 200, // OK
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Job Post Updated Successfully",
        updatedJobPost,
      }),
    };
  } catch (error) {
    console.error("Error updating job post:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error updating job post" }),
    };
  }
};

// Helper function to check if an ID is a valid MongoDB ObjectID
function isValidObjectId(id) {
  const { ObjectId } = require("mongoose").Types;
  return ObjectId.isValid(id);
}
