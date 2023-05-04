const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
module.exports = ()=>{
    const store = new MongoDBStore({ 
        uri:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t9jp2.mongodb.net/${process.env.DB_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
        collection:'sessions'
    })
}