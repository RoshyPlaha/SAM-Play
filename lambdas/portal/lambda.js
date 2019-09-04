'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const boom = require('express-boom')
const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const awsServerlessExpress = require('aws-serverless-express')
const app = express()
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

const index = require('./index');
// const invite = require('./routes/invite/invite')

// router.route('/invite/:inviteId/resend').post(invite.postResendInvite)
router.route('/test').post(index.aTest)
router.route('/test').get(index.aTest)

app.use(boom())
app.use('/', router)

const binaryMimeTypes = ['application/javascript']

exports.handler = (event, context) => {
    if (event.pathParameters && event.pathParameters.proxy)
        router.use((req,_,next) => {
            req.url = '/' + event.pathParameters.proxy
            next()
        })
    app.use('/', router)
    const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)
    awsServerlessExpress.proxy(server, event, context)
}
