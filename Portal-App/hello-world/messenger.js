const AWS = require('aws-sdk')
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PNF = require('google-libphonenumber').PhoneNumberFormat;

const validateNumber = (mobileNumber) => {
    const number = phoneUtil.parseAndKeepRawInput(mobileNumber, 'GB')
    if (phoneUtil.isValidNumber(number)) {
        return phoneUtil.format(number, PNF.E164);
    }
    console.error('Invalid number: ' + mobileNumber);
    return -1;
}

const sendMessage = async (mobileNumber, message) => {
    return new Promise((res, rej) => {
        const formattedNumber = validateNumber(mobileNumber);

        if (formattedNumber == -1) {
            throw new Error('Phone number is not valid: ' + mobileNumber);
        }

        console.log('Formatted number is: ' + formattedNumber)
        const params = {
            Message: message, /* required */
            PhoneNumber: formattedNumber,
        }

        publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31', region: 'eu-west-1' }).publish(params).promise(); // only eu-west-1 is supported in eu

        console.log('OK to send text message');
        publishTextPromise.then((data) => {
            console.log("MessageID is " + data.MessageId);
            return res('OK to send message');
        }).catch((err) => {
            console.log('an error occured');
            return rej('Failed to send message');
        });

    }).catch((err) => {
        throw (err)
    });
}

module.exports = {
    sendMessage
}