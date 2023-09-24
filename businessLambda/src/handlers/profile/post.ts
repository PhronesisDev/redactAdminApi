import { connectToDatabase } from "../../db-connection";
import { Profile } from "../../models/profile.model";
import * as AWS from "aws-sdk";
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  //   await connectToDatabase();
  const requestBody = JSON.parse(event.body);
  const { avatar, file, email, reference, description } = requestBody;
  try {
    const fileKey = `${reference}/cv.pdf`;
    const bucket = "redact-bucket-general"; // Replace with your bucket name
    const fileBuffer = Buffer.from(file, "base64");
    await connectToDatabase();
    // // Upload the image to the S3 bucket
    await s3
      .putObject({
        Bucket: bucket,
        Key: fileKey,
        Body: fileBuffer,
        ContentEncoding: 'base64', // Set content encoding for base64 data
        ContentType: 'application/pdf', 
      })
      .promise()
      .then((result) => console.log("file result: ", result))
      .catch((error) => console.log("error: ", error));
    const imageKey = `${reference}/1.jpg`;
    const imageBuffer = Buffer.from(avatar, "base64");
    await s3
      .putObject({
        Bucket: bucket,
        Key: imageKey,
        Body: imageBuffer,
      })
      .promise()
      .then((result) => console.log("image result: ", result));
      const imageUrl = `https://${bucket}.s3.amazonaws.com/${imageKey}`;
      const fileUrl =  `https://${bucket}.s3.amazonaws.com/${fileKey}`
    console.log("Event: ", event.body);
    // Create a new reported user in the database;

    const existingProfile = await Profile.findOne({ reference });
    if (existingProfile) {
      // If a profile with the reference exists, update it
      existingProfile.set({
        avatar: imageUrl,
      file: fileUrl,
      email,
      reference,
      description
      });
      await existingProfile.save();
      console.log('Profile updated:', existingProfile);
      return {
        statusCode: 201, // Created
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Details Uploaded Successfully",
          report: existingProfile,
        }),
      };
      
    } 
    else{
      const profile = new Profile({
        avatar: imageUrl,
        file: fileUrl,
        email,
        reference,
        description
      });

       // Save reported user to the database
    const savedProfile = await profile.save();
    return {
      statusCode: 201, // Created
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Details Uploaded Successfully",
        report: savedProfile,
      }),
    };
    }
   

   

    
  } catch (error) {
    console.error("An error occurred while trying to report user:", error);
    return {
      statusCode: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "An error occurred while trying to report user.",
      }),
    };
  }
};
