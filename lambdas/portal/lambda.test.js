
process.env.NAMESPACE = 'foo'
process.env.PENNY_DETAILS_S3_KEY = 'key'
process.env.PENNY_DETAILS_S3_BUCKET = 'bucketname'
process.env.INVITE_URL = 'https://bar'

const lambda = require('./lambda')

describe('lambda', () => {
    it('should initialize correctly', () => {
        expect(lambda).toBeTruthy()
    })
})