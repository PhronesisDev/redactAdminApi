import { connectToDatabase } from "../../db-connection";
import { Reports } from "../../models/reports.model";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  try {
    // Check if the "reference" query parameter exists in the event object
    const { id } = event.queryStringParameters?.reference|| {};

    // Prepare the query object based on the existence of the "reference" parameter
   

    // Find job posts based on the query (either filtered by reference or all job posts)
    const jobPosts = await Reports.find({id: `${event.queryStringParameters?.id}`});

    if (jobPosts.length === 0) {
      return {
        statusCode: 404, // Not Found
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "No reported Accounts found",
        }),
      };
    }

    return {
      statusCode: 200, // OK
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Reports Retrieved Successfully",
        jobPosts,
      }),
    };
  } catch (error) {
    console.error("Error fetching job posts:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error fetching job posts" }),
    };
  }
};
