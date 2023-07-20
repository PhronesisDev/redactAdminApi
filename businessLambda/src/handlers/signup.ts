import bcrypt from "bcryptjs";
import { Authentication } from "../models/user.model";
import { connectToDatabase } from "../db-connection";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Raw event:", event);

  await connectToDatabase();

  try {
    const { identityNo, password } = event;

    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the user with the given id
    let user = await Authentication.findOne({ identityNo });

    if (!user) {
      // If no user is found, create a new user with the provided ID and hashed password
      user = new Authentication({ identityNo, password: hashedPassword });
      await user.save();
    } else {
      // If the user is found, update the hashed password
      user.password = hashedPassword;
      await user.save();
    }

    // Return the user details (excluding the password)
    const userWithoutPassword = user.toObject();


    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error finding/updating user:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: { message: "Error finding/updating user" },
    };
  }
};
