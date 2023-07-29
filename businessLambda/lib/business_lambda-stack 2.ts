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
    const createPostFn = new NodejsFunction(this, `CreatePostFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/create-post.ts'),
      functionName: `business-api-create-post`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2020',
      }
    });

    const createPostLambdaIntegration = new apigw.LambdaIntegration(
      createPostFn
    );

    const blogPostsResource = api.root.addResource("posts");
    blogPostsResource.addMethod("POST", createPostLambdaIntegration);
  }
}
