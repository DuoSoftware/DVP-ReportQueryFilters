/**
 * Created by Rajinda on 08/17/2017.
 */


//-------------------------  config ------------------------- \\
var config = require('config');
var port = config.Host.port || 3000;
var version = config.Host.version;
// ---------------- Security -------------------------- \\
var jwt = require('restify-jwt');
var secret = require('dvp-common-lite/Authentication/Secret.js');
var authorization = require('dvp-common-lite/Authentication/Authorization.js');
var messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');
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

var logger = require('dvp-common-lite/LogHandler/CommonLogHandler.js').logger;
var reportQueryFilterHandler = require('./reportQueryFilterHandler');
var mongomodels = require("dvp-mongomodels");


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