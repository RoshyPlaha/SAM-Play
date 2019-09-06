const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId: "", // fill this in for your local-branch
    ClientId: "" // fill this in for your local-branch
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function Login() {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : 'sampleEmail@gmail.com',
        Password : 'SamplePassword123',
    });

    var userData = {
        Username : 'sampleEmail@gmail.com',
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('id token + ' + result.getIdToken().getJwtToken()); // its the Id token that allows us to authenticate with our lambda's that have Authorization set
        },
        onFailure: function(err) {
            console.log(err);
        },

    });
}

Login()