## Setup
Code deployment found inside Infrastructure folder
TB have indicated they use Trophosphere to generate CloudFormation scripts

#### Installing the AWS SAM (Server Application Model)
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html 

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

### Running the code locally
No tests have been done to run authorizors locally for cognito. However, unauthorised endpoints can be tested locally w/ DynamoDB.
You will need to install docker to run locally. Then, from the root of the project you can run:
sam local start-api

### Deploying the code
This project uses the AWS SAM Template, so there's a few steps we need to go through
1) sam build (do this at the level where the template.yml exists. This scans the project folders for all dependencies and places all resources in a staging folder: .aws-sam/build)
2) sam package --output-template packaged.yml --s3-bucket <bucketName> (e.g rosho-sam-test) (This step just uploads it to s3 w/ dependencies and produces this packaged.yml that states the s3 location)
3) sam deploy --template-file packaged.yml --region eu-west-2 --capabilities CAPABILITY_IAM --stack-name <stack-name>

If you want to see the outputs produced by the cloudformation script, use:
aws cloudformation describe-stacks --stack-name <stack-name>

### Cognito User Sign up
Quickest to sign up a user is to make use of the helper folder in this repository:
- This is a small node project that helps you create users (agents) and generate the identity token we need to pass to restricted endpoints e.g. getMetrics

### Useful Articles
https://github.com/awslabs/serverless-application-model/blob/master/examples/2016-10-31/api_cognito_auth/template.yaml
https://medium.com/ovrsea/a-domain-name-for-your-react-app-c05821fd3518 
https://stackoverflow.com/questions/35190615/api-gateway-cors-no-access-control-allow-origin-header
https://github.com/aws-samples/startup-kit-serverless-workload/blob/master/serverless.cfn.yml
http://react.tips/radio-buttons-in-react-16/