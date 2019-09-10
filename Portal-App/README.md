### TB ROSHO
This is an example project which allows a customer to choose some preferences and get a text sent to them, confirming they have submitted their options.
The project infrastructure is all based on AWS. The backend code is written in NodeJS 8.10 and the Front-end is React. NPM is used for both to manage dependencies.

#### Setup
##### Installing the AWS SAM (Server Application Model)
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html 


#### Structure
The project structure includes the front-end and back-end (hello-world) code all in the same repo
#### NodeJs setup for Lambda's. NPM to manage dependencies
We recommend the following tools:
- Download the latest stable version here: https://nodejs.org/en/
- Also install nvm so you can change your node version to a runtime that is supported by lambda. This project is setup to currently use V8.10. 
To install the version, run: nvm install 8.10 && nvm alias default 8.10
Please double check that the running node version is set to 8.10. Close all terminals (Force Quit) and reopen a terminal. Then run: node -v

Run npm install to download all dependencies for the project, specified in the package.json file.

### Unit Testing via JEST
Read here for information on JEST.
To run all test in the project, you can simply execute:
npm test
To run a specific folder or file of tests, run:
npm test <path to file here>

### AWS CLI (do this after install Python)
Cloudformation (or any other Infrastructure as Code tool using the AWS CLI behind the scenes to upload your code and configuration to the correct AWS account. It is the AWS CLI that determines which AWS account is used)
Instructions are here: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html 

### Running the backend code locally
No tests have been done to run authorizors locally for cognito. However, unauthorised endpoints can be tested locally w/ DynamoDB.
You will need to install docker to run locally. Then, from the root of the project you can run:
sam local start-api

### Running the frontend code locally
Navigate to the Portal-App/Front-end directory and execute: npm run start (note you will still need to ensure that the API gateway reference in Portal-App/front-end/src/App.js is either pointing to localhost:3000 or the deployed API gateway on AWS.

### Deploying the backend code and infrastructure
This project uses the AWS SAM Template, so there's a few steps we need to go through. Note - the following commands need to be done at root
1) sam build (do this at the level where the template.yml exists. This scans the project folders for all dependencies and places all resources in a staging folder: .aws-sam/build)
2) sam package --output-template packaged.yml --s3-bucket <bucketName> (e.g rosho-sam-test) (This step just uploads it to s3 w/ dependencies and produces this packaged.yml that states the s3 location)
3) sam deploy --template-file packaged.yml --region eu-west-2 --capabilities CAPABILITY_IAM --stack-name <stack-name>

If you want to see the outputs produced by the cloudformation script, use:
aws cloudformation describe-stacks --stack-name <stack-name>

### Deploying the frontend code
Before we can deploy the frontend, we need to update a Portal-App/front-end/src/App.js for the API gateway endpoint to be the output of the cloudformation deploy in step 3 above. Note - this should reference the submitOption API endpoint and NOT hello-world. Once this change has been implemented, you need to navigate to: 
1) cd Portal-App/front-end
2) npm run build ()
3) npm run deploy (You can update the s3 bucket here so it references the bucket value in the template.yml file for resource name: FrontendTBBucket)


### Cognito User Sign up
Some endpoints require an authorised user to invoke them e.g: GET /Prod/hello
In order to access this endppint, you need to create a user. Prereq is having the backend deployed into aws - so you can input the client and pool id in the below instructions

1) Quickest to sign up a user is to make use of the helper folder in this repository:
- This is a small node project that helps you create users (agents) and generate the identity token we need to pass to restricted endpoints e.g. getMetrics
2) Input the pool and client id and run: userMgmt/RegisterAgentUser.js 
3) Accept the User as authorized in the aws console
4) Run: node userMgmt/LoginAgentUser.js This will return an id token
5) Set the headers in Chrome or Postman to have a key of: Authorization and value of: <id token>

### Useful Articles
https://github.com/awslabs/serverless-application-model/blob/master/examples/2016-10-31/api_cognito_auth/template.yaml
https://medium.com/ovrsea/a-domain-name-for-your-react-app-c05821fd3518 
https://stackoverflow.com/questions/35190615/api-gateway-cors-no-access-control-allow-origin-header
https://github.com/aws-samples/startup-kit-serverless-workload/blob/master/serverless.cfn.yml
http://react.tips/radio-buttons-in-react-16/