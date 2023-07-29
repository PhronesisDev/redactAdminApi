// @ts-nocheck
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib/core";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class WorkerLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new apigw.RestApi(this, `WorkerApiGateway`, {
      restApiName: `worker-api`,
      deployOptions: {
        metricsEnabled: true,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      cloudWatchRole: true,
    });

    // Define the Lambda function with code from the correct file path
    const authenticateFn = new NodejsFunction(this, `workerAuthenticateFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/authentication/post.ts'),
      functionName: `worker-authentication`,
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
    // SignUp Function 
    const signUpFn = new NodejsFunction(this, 'workerSignupFunction', {
      entry: path.resolve(__dirname, '../src/handlers/authentication/signup.ts'),
      functionName:'worker-sign-up',
      handler:'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2020',
      }
    })



  



    const createAuthenticationLambdaIntegration = new apigw.LambdaIntegration(
      authenticateFn
    );
    const createSignupLambdaIntegration = new apigw.LambdaIntegration(
      signUpFn
    );

  
    const businessResource = api.root.addResource("worker-authenticate");
    businessResource.addMethod("POST", createAuthenticationLambdaIntegration );
    const signupBusinessResource=api.root.addResource('signup');
    signupBusinessResource.addMethod('POST',createSignupLambdaIntegration);

    
  }
}
