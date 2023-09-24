import * as AWS from "aws-sdk";

interface EventBody {
  receiver: string;
  sender: string;
  message: string;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const simpleEmailService = new AWS.SES();

  const eventBody: EventBody = JSON.parse(event.body);
  try {
    const params = {
      Destination: {
        ToAddresses: [eventBody.receiver],
      },
      Message: {
        Body: {
          Text: {
            Data: eventBody.message,
            Charset: "UTF-8",
          },
        },
        Subject: {
          Data: "Redact: The Next Step",
          Charset: "UTF-8",
        },
      },
      Source: eventBody.sender,
    };
   const response = await simpleEmailService.sendEmail(params).promise();
   console.log('response: ', response.$response)
    return { statusCode: 201, body: JSON.stringify({ message: "success" }) };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: JSON.stringify({ message: error }) };
  }
};
