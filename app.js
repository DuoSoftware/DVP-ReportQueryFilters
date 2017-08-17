/**
 * Created by Rajinda on 08/17/2017.
 */


//-------------------------  config ------------------------- \\
var config = require('config');
var port = config.Host.port || 3000;
var version = config.Host.version;
// ---------------- Security -------------------------- \\
var jwt = require('restify-jwt');
var secret = require('dvp-common/Authentication/Secret.js');
var authorization = require('dvp-common/Authentication/Authorization.js');
// ---------------- Security -------------------------- \\

//-------------------------  Restify Server ------------------------- \\
var restify = require('restify');
var RestServer = restify.createServer({
    name: "DVP-ReportQueryFilters",
    version: '1.0.0'
}, function (req, res) {

});
restify.CORS.ALLOW_HEADERS.push('api_key');
restify.CORS.ALLOW_HEADERS.push('authorization');

RestServer.use(restify.CORS());
RestServer.use(restify.fullResponse());
//Enable request body parsing(access)
RestServer.use(restify.bodyParser());
RestServer.use(restify.acceptParser(RestServer.acceptable));
RestServer.use(restify.queryParser());
RestServer.use(jwt({secret: secret.Secret}));
RestServer.listen(port, function () {
    console.log('%s listening at %s', RestServer.name, RestServer.url);
});

//------------------------- End Restify Server ------------------------- \\

var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var reportQueryFilterHandler = require('./reportQueryFilterHandler');


//------------------------- mongoose ------------------------- \\


var util = require('util');
var mongoip=config.Mongo.ip;
var mongoport=config.Mongo.port;
var mongodb=config.Mongo.dbname;
var mongouser=config.Mongo.user;
var mongopass = config.Mongo.password;
var mongoreplicaset= config.Mongo.replicaset;

var mongoose = require('mongoose');
var connectionstring = '';
if(util.isArray(mongoip)){

    mongoip.forEach(function(item){
        connectionstring += util.format('%s:%d,',item,mongoport)
    });

    connectionstring = connectionstring.substring(0, connectionstring.length - 1);
    connectionstring = util.format('mongodb://%s:%s@%s/%s',mongouser,mongopass,connectionstring,mongodb);

    if(mongoreplicaset){
        connectionstring = util.format('%s?replicaSet=%s',connectionstring,mongoreplicaset) ;
    }
}else{

    connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',mongouser,mongopass,mongoip,mongoport,mongodb)
}


mongoose.connect(connectionstring,{server:{auto_reconnect:true}});


mongoose.connection.on('error', function (err) {
    console.error( new Error(err));
    mongoose.disconnect();

});

mongoose.connection.on('opening', function() {
    console.log("reconnecting... %d", mongoose.connection.readyState);
});


mongoose.connection.on('disconnected', function() {
    console.error( new Error('Could not connect to database'));
    mongoose.connect(connectionstring,{server:{auto_reconnect:true}});
});

mongoose.connection.once('open', function() {
    console.log("Connected to db");

});


mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});



process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


//------------------------- mongoose ------------------------- \\



RestServer.post('/DVP/API/' + version + '/ReportQueryFilter/:ReportName', authorization({
    resource: "myUserProfile",
    action: "write"
}), function (req, res, next) {
    try {

        logger.info('AddReportFilter - [HTTP]  - Request received -  Data - %s ', JSON.stringify(req.body));
        reportQueryFilterHandler.AddReportFilter(req, res);
    }
    catch (ex) {

        logger.error('AddReportFilter - [HTTP]  - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('AddReportFilter - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/' + version + '/ReportQueryFilter/:ReportName', authorization({
    resource: "myUserProfile",
    action: "read"
}), function (req, res, next) {
    try {

        logger.info('GetReportFilter - [HTTP]  - Request received -  Data - %s ', JSON.stringify(req.body));
        reportQueryFilterHandler.GetReportFilter(req, res);
    }
    catch (ex) {

        logger.error('GetReportFilter - [HTTP]  - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('GetReportFilter - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});