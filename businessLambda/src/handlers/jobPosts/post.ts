import { connectToDatabase } from "../../db-connection";
import { Posts } from "../../models/jobpost.model";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();
  const requestBody = JSON.parse(event.body)
  const { title, description, company, applicants, reference } = requestBody;
  try {
    console.log("Event: ", event.body.title);
    // Create a new job post in the database
    const newJobPost = new Posts({
      title,
      description,
      company,
      applicants,
      reference
    });



    // Save the job post to the database
    const savedJobPost = await newJobPost.save();

    return {
      statusCode: 201, // Created
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Job Post Created Successfully",
        jobPost: savedJobPost,
      }),
    };
  } catch (error) {
    console.error("Error creating job post:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error creating job post" }),
    };
  }
};
