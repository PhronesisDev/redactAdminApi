import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib/core";
import path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class BusinessLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new apigw.RestApi(this, `BusinessApiGateway`, {
      restApiName: `business-api`,
      deployOptions: {
        metricsEnabled: true,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      cloudWatchRole: true,
    });

    // Define the Lambda function with code from the correct file path
    const authenticateFn = new NodejsFunction(this, `authenticateFunction`, {
      entry: path.resolve(__dirname, "../src/handlers/authentication/post.ts"),
      functionName: `authentication`,
      handler: "handler",
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });
    // SignUp Function
    const signUpFn = new NodejsFunction(this, "signupFunction", {
      entry: path.resolve(
        __dirname,
        "../src/handlers/authentication/signup.ts"
      ),
      functionName: "sign-up",
      handler: "handler",
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });

    const createJobFunction = new NodejsFunction(this, "createJobFunction", {
      entry: path.resolve(__dirname, "../src/handlers/jobPosts/post.ts"),
      functionName: "create-job-post",
      handler: "handler",
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });

    const deleteJobFunction = new NodejsFunction(this, "deleteJobFunction", {
      entry: path.resolve(__dirname, "../src/handlers/jobPosts/remove.ts"),
      functionName: "delete-job-post",
      handler: "handler",
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });
    const updateJobFunction = new NodejsFunction(this, "updateJobFunction", {
      entry: path.resolve(__dirname, "../src/handlers/jobPosts/update.ts"),
      functionName: "update-job-post",
      handler: "handler",
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });

    const getJobFunction = new NodejsFunction(this, "getJobFunction", {
      entry: path.resolve(__dirname, "../src/handlers/jobPosts/get.ts"),
      functionName: "get-job-post",
      handler: "handler",
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });
    // ---------------------------------------------------Reports Section ------------------------------------------------------------//

    const createReportsFunction = new NodejsFunction(
      this,
      "createReportsFunction",
      {
        entry: path.resolve(__dirname, "../src/handlers/reports/post.ts"),
        functionName: "create-report-post",
        handler: "handler",
        memorySize: 512,
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
        runtime: Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(15),
        bundling: {
          target: "es2020",
        },
      }
    );

    const deleteReportsFunction = new NodejsFunction(
      this,
      "deleteReportsFunction",
      {
        entry: path.resolve(__dirname, "../src/handlers/reports/remove.ts"),
        functionName: "delete-reports-post",
        handler: "handler",
        memorySize: 512,
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
        runtime: Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(15),
        bundling: {
          target: "es2020",
        },
      }
    );
    const updateReportsFunction = new NodejsFunction(
      this,
      "updateReportsFunction",
      {
        entry: path.resolve(__dirname, "../src/handlers/reports/update.ts"),
        functionName: "update-reports-post",
        handler: "handler",
        memorySize: 512,
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
        runtime: Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(15),
        bundling: {
          target: "es2020",
        },
      }
    );
    const getReportsFunction = new NodejsFunction(this, "getReportsFunction", {
      entry: path.resolve(__dirname, "../src/handlers/reports/get.ts"),
      functionName: "get-reports-post",
      handler: "handler",
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });
    // ----------------------------------------End Reports Section ---------------------------------------------------------//

    // ----------------------------------------Facial Recognition Section -------------------------------------------------//
    const getFaceMatchFunction = new NodejsFunction(
      this,
      "getFaceMatchFunction",
      {
        entry: path.resolve(
          __dirname,
          "../src/handlers/facialRecognition/post.ts"
        ),
        functionName: "get-comparison-post",
        handler: "handler",
        memorySize: 512,
        runtime: Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(15),
        bundling: {
          target: "es2020",
        },
      }
    );

    // ---------------------------------------- End Facial Recognition Section -------------------------------------------------//

    // ---------------------------------------- Send Mail Section -------------------------------------------------------------//
    const postMailFunction = new NodejsFunction(this, "postMailFunction", {
      entry: path.resolve(__dirname, "../src/handlers/sendMail/post.ts"),
      functionName: "mail-function-post",
      handler: "handler",
      memorySize: 512,
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: "es2020",
      },
    });
    // --------------------------------------- End Mail Section ----------------------------------------------------------------//
    // ----------------------------------------Update Profile ----------------------------------------------------------------- //
    const postProfileFunction = new NodejsFunction(
      this,
      "postProfileFunction",
      {
        entry: path.resolve(__dirname, "../src/handlers/profile/post.ts"),
        functionName: "profile-function-post",
        handler: "handler",
        memorySize: 512,
        runtime: Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(15),
        bundling: {
          target: "es2020",
        },
      }
    );
    const getProfileFunction = new NodejsFunction(
      this,
      "getProfileFunction",
      {
        entry: path.resolve(__dirname, "../src/handlers/profile/get.ts"),
        functionName: "profile-function-get",
        handler: "handler",
        memorySize: 512,
        runtime: Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(15),
        bundling: {
          target: "es2020",
        },
      }
    );
    // ---------------------------------- End of Update Profile -------------------------------------------------------------- //

    const postProfileLambdaIntegration = new apigw.LambdaIntegration(
      postProfileFunction
    );
    const getProfileLambdaIntegration = new apigw.LambdaIntegration(
      getProfileFunction
    );
    const postMailLambdaIntegration = new apigw.LambdaIntegration(
      postMailFunction
    );
    const getFacialRecognitionLambdaIntegration = new apigw.LambdaIntegration(
      getFaceMatchFunction
    );

    const createAuthenticationLambdaIntegration = new apigw.LambdaIntegration(
      authenticateFn
    );
    const createSignupLambdaIntegration = new apigw.LambdaIntegration(signUpFn);

    const createReportsLambdaIntegration = new apigw.LambdaIntegration(
      createReportsFunction
    );

    const deleteReportsLambdaIntegration = new apigw.LambdaIntegration(
      deleteReportsFunction
    );
    const updateReportsLambdaIntegration = new apigw.LambdaIntegration(
      updateReportsFunction
    );

    const getReportsLambdaIntegration = new apigw.LambdaIntegration(
      getReportsFunction
    );

    const createJobPostLambdaIntegration = new apigw.LambdaIntegration(
      createJobFunction
    );

    const deleteJobPostLambdaIntegration = new apigw.LambdaIntegration(
      deleteJobFunction
    );
    const updateJobPostLambdaIntegration = new apigw.LambdaIntegration(
      updateJobFunction
    );

    const getJobPostLambdaIntegration = new apigw.LambdaIntegration(
      getJobFunction
    );
    const businessResource = api.root.addResource("authenticate");
    businessResource.addMethod("POST", createAuthenticationLambdaIntegration);
    const signupBusinessResource = api.root.addResource("signup");
    signupBusinessResource.addMethod("POST", createSignupLambdaIntegration);

    const businessPosts = api.root.addResource("posts");
    businessPosts.addMethod("POST", createJobPostLambdaIntegration);
    businessPosts.addMethod("GET", getJobPostLambdaIntegration);
    businessPosts.addMethod("PUT", updateJobPostLambdaIntegration);
    businessPosts.addMethod("DELETE", deleteJobPostLambdaIntegration);

    const businessReports = api.root.addResource("reports");
    businessReports.addMethod("POST", createReportsLambdaIntegration);
    businessReports.addMethod("GET", getReportsLambdaIntegration);
    businessReports.addMethod("PUT", updateReportsLambdaIntegration);
    businessReports.addMethod("DELETE", deleteReportsLambdaIntegration);

    const facialRecognition = api.root.addResource("facialrecognition");
    facialRecognition.addMethod("POST", getFacialRecognitionLambdaIntegration);

    const sendMail = api.root.addResource("sendmail");
    sendMail.addMethod("POST", postMailLambdaIntegration);

    const profile = api.root.addResource("profile");
    profile.addMethod("POST", postProfileLambdaIntegration);
    profile.addMethod("GET", getProfileLambdaIntegration )
  }
}
