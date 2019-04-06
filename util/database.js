const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://fedej:J7LqOT1tAwzpMPnh@clustertest-j7mx2.mongodb.net/test?retryWrites=true')
        .then(client => {
            console.log('connected');
            callback(client);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = mongoConnect;