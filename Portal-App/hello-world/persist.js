const AWS = require("aws-sdk")

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMO_TABLE;

const savePreferences = (id, option) => {
    console.log('The table name is: ' + tableName)
    return new Promise((res, rej) => {
        const params = {
            TableName: tableName,
            Item: {
                'id': id,
                'option': option,
                'insertDate': new Date().toISOString
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                rej("Unable to add item. Error JSON:" + err);
            } else {
                console.log("Added item:");
                res(data);
            }
        });
    });
}

module.exports = {
    savePreferences
}