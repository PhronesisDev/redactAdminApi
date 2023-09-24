import { connectToDatabase } from "../../db-connection";
import { Reports } from "../../models/reports.model";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();
  const requestBody = JSON.parse(event.body);
  const { name, status, avatar} = requestBody;
  try {
    console.log("Event: ", event.body.title);
    // Create a new reported user in the database
    const report = new Reports({
      name,
      status,
      avatar
    });

    // Save reported user to the database
    const savedReport = await report.save();

    return {
      statusCode: 201, // Created
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "User Reported Successfully",
        report: savedReport,
      }),
    };
  } catch (error) {
    console.error("An error occurred while trying to report user:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "An error occurred while trying to report user." }),
    };
  }
};
