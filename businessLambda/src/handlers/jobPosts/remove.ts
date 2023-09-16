import { connectToDatabase } from "../../db-connection";
import { Posts } from "../../models/jobpost.model";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  try {
    // Assuming the object ID is passed as a query parameter in the event object
    const { id } = event.queryStringParameters;

    // // Check if the ID is valid before proceeding with the deletion
    // if (!isValidObjectId(id)) {
    //   return {
    //     statusCode: 400, // Bad Request
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       message: "Invalid object ID",
    //     }),
    //   };
    // }

    // Find the job post by its object ID
    const jobPost = await Posts.findById(id);

    if (!jobPost) {
      return {
        statusCode: 404, // Not Found
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "No job post found with the given object ID",
        }),
      };
    }

    // Delete the job post
    await jobPost.deleteOne();

    return {
      statusCode: 200, // OK
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Job Post Deleted Successfully",
        deletedJobPost: jobPost,
      }),
    };
  } catch (error) {
    console.error("Error deleting job post:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error deleting job post" }),
    };
  }
};

// Helper function to check if an ID is a valid MongoDB ObjectID
function isValidObjectId(id) {
  const { ObjectId } = require("mongoose").Types;
  return ObjectId.isValid(id);
}
