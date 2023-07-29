import bcrypt from "bcryptjs";
import { Authentication } from "../../models/user.model";
import { connectToDatabase } from "../../db-connection";

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Raw event:", event);

  await connectToDatabase();

  try {
    const body = JSON.parse(event.body)
    const { registrationNo, password } = body;

    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the user with the given id
    let user = await Authentication.findOne({ registrationNo });

    if (!user) {
      // If no user is found, create a new user with the provided ID and hashed password
      user = new Authentication({ registrationNo, password: hashedPassword });
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
      body: JSON.stringify(userWithoutPassword),
    };
  } catch (error) {
    console.error("Error finding/updating user:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Error finding/updating user" }),
    };
  }
};
