const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId: "", // fill this in for your local-branch
    ClientId: "" // fill this in for your local-branch
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function RegisterUser() {
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: "Rosho2 Plaha" }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: "sampleEmail2@gmail.com" }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "phone_number", Value: "+7782928272" }));

    userPool.signUp('sampleEmail2@gmail.com', 'SamplePassword123', attributeList, null, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

RegisterUser()