## Setup
Code deployment found inside Infrastructure folder
TB have indicated they use Trophosphere to generate CloudFormation scripts

#### Trophosphere w/ Python to manage Infrastructure as Code
A tool to generate Cloudformation scripts. Trophosphere is written in Python. Please install Python >= 3.6.
We recommend using a virtualenv when working with Python. That way, you wont interfere with other projects / system dependencies that require a certain version of python.

To install and use VirtualEnv, use: https://docs.python.org/3/library/venv.html

To activate the correct virtualEnv in your existing terminal run:
source <env-name-here>/bin/activate

You should then install boto3 and the awscli into this virtualenv by using pip

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
