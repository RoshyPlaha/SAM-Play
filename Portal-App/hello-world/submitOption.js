const axios = require('axios')
const messenger = require('./messenger')
const url = 'http://checkip.amazonaws.com/';
const personalisedMessage = "Thank you for submitting your preferences";
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {

        const body = JSON.parse(event.body);

        if (!body || !body.ID || !body.postCode || !body.mobileNumber) {
            throw('No body defined or missing key fields!')
        }
    
        const ret = await axios(url);

        await messenger.sendMessage(body.mobileNumber, personalisedMessage)
        .then(() => {
            response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    message: 'Preferences submitted',
                    location: ret.data.trim(),
                    identification: body.ID
                })
            }
        }).catch((err) => {
            console.log('Something went wrong ' + err);
            throw(err);
        })
        
    } catch (err) {
        console.log('Got it: ' + err);
        response = {
            'statusCode': 400,
            'body': JSON.stringify({
                message: err + ''
            })
        }
    }

    return response
};
