import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../db-connection";
import { Authentication } from "../../models/user.model";


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Raw event:", event);

  await connectToDatabase();

  try {
    const { identityNo, password } = event;

    // Find the user with the given identityNo
    const user = await Authentication.findOne({ identityNo });

    if (!user) {
      // If no user is found, return an error indicating invalid credentials
      return {
        statusCode: 404, // Not Found
        headers: {
          "Content-Type": "application/json",
        },
        body: { message: "Invalid credentials" },
      };
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // If the passwords don't match, return an error indicating invalid credentials
      return {
        statusCode: 401, // Unauthorized
        headers: {
          "Content-Type": "application/json",
        },
        body: { message: "Invalid credentials" },
      };
    }

    // If the passwords match, return the user details
    const userWithoutPassword = user.toObject();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: "Successfully Logged In",
        info: userWithoutPassword,
      },
    };
  } catch (error) {
    console.error("Error finding user:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: { message: "Error finding user" },
    };
  }
};
