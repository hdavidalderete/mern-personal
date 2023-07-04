const { mongoose , ServerApiVersion } = require('mongoose ');

const uri = "mongodb+srv://admin:7kNZQnUgaHdULbp6@web-personal.mmccgzb.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let _db;

const mongoConnect = callback => {
    client.connect(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      })
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(error => {
        console.log('Entro en el ERROR', error);
        throw error;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
