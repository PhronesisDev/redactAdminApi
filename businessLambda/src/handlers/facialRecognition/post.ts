import * as AWS from "aws-sdk";

interface EventBody {
  idNo: string;
  data: string
}


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const s3 = new AWS.S3();
  const imageData: EventBody = JSON.parse(event.body);


  // Extract the URI and convert it to base64 (you may need to handle different URI formats)

  const imageKey = `source/${imageData.idNo}/1.jpg`;
  const bucket = "redact-bucket-images"; // Replace with your bucket name
  const imageBuffer = Buffer.from(imageData.data, "base64");
  // // Upload the image to the S3 bucket
  await s3
    .putObject({
      Bucket: bucket,
      Key: imageKey,
      Body: imageBuffer,
    })
    .promise();

  const photo_source = `source/${imageData.idNo}/1.jpg`; // Replace with the source photo name
  const photo_target = `target/${imageData.idNo}/1.JPG`; // Replace with the target photo name

  const rekognition = new AWS.Rekognition();

  const params = {
    SourceImage: {
      S3Object: {
        Bucket: bucket,
        Name: photo_target,
      },
    },
    TargetImage: {
      S3Object: {
        Bucket: bucket,
        Name: photo_source,
      },
    },
    SimilarityThreshold: 70,
  };

  try{
    const response = await rekognition
    .compareFaces(params)
    .promise();

    if (response.FaceMatches && response.FaceMatches.length > 0) {
      const match = response.FaceMatches[0];
      
      // Access the similarity score to determine how closely the faces match
      const similarityScore = match.Similarity;
      return {
        statusCode: 200,
        body: JSON.stringify({message: 'success', data: similarityScore}),
      };
    } else {
      const match = response?.FaceMatches[0];
      const similarityScore = match.Similarity;
      return {
        statusCode: 200,
        body: JSON.stringify({message: 'success', data: similarityScore}),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
  
}



