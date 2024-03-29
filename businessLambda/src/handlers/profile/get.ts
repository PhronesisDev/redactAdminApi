import { connectToDatabase } from "../../db-connection";
import { Profile } from "../../models/profile.model";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  try {
    // Check if the "reference" query parameter exists in the event object
    const { id } = event.queryStringParameters?.id|| {};

    // Prepare the query object based on the existence of the "reference" parameter
   

    // Find job posts based on the query (either filtered by reference or all job posts)
    const profileData = await Profile.find({id});

    if (profileData.length === 0) {
      return {
        statusCode: 404, // Not Found
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "No profile data found",
        }),
      };
    }

    return {
      statusCode: 200, // OK
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Profiles Retrieved Successfully",
        profileData,
      }),
    };
  } catch (error) {
    console.error("Error fetching profile data: ", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error fetching profile data" }),
    };
  }
};
