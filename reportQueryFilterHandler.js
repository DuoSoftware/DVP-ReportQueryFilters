/**
 * Created by Waruna on 8/17/2017.
 */


var ReportQueryFilters = require('dvp-mongomodels/model/ReportQueryFilters');
var messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');

module.exports.AddReportFilter  = function (req, res) {

    var jsonString;
    var tenant = parseInt(req.user.tenant);
    var company = parseInt(req.user.company);
    var iss = req.user.iss;

    if(req.body && req.params.ReportName && req.body.ReportFilter ) {

        ReportQueryFilters.update({resourceName: iss,resourceId: iss,reportName:req.params.ReportName,company: company, tenant: tenant},{
            $set: {
                "resourceName": iss,
                "resourceId": iss,
                "reportName":req.params.ReportName,
                "reportFilter":req.body.ReportFilter,
                "tenant":tenant,
                "company":company,
                "created_at": Date.now(),
                "updated_at": Date.now()
            }
        }, {upsert: true, new: true}, function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "reportQueryFilter save failed", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "reportQueryFilter saved successfully", true, report);
            }
            res.end(jsonString);
        });
        /*

        var reportQueryFilter = ReportQueryFilters({
            resourceName: iss,
            resourceId: iss,
            reportName: req.params.ReportName,
            reportFilter: req.body.ReportFilter,
            tenant: tenant,
            company: company,
            created_at: Date.now(),
            updated_at: Date.now()
        });

        reportQueryFilter.save(function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "reportQueryFilter save failed", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "reportQueryFilter saved successfully", true, report);
            }
            res.end(jsonString);
        });*/
    }else{
        jsonString = messageFormatter.FormatMessage(null, "Require fields not found", false, null);
        res.end(jsonString);

    }
};

module.exports.GetReportFilter  = function (req, res) {

    var jsonString;
    var tenant = parseInt(req.user.tenant);
    var company = parseInt(req.user.company);
    var iss = req.user.iss;

    if(req.params.ReportName ) {
        ReportQueryFilters.findOne({resourceName: iss,resourceId: iss,reportName:req.params.ReportName,company: company, tenant: tenant}).select("-_id reportName reportFilter")
            .exec(function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "Fail to find reportQueryFilter", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "reportQueryFilter Details", true, report);
            }
            res.end(jsonString);
        });
    }else{
        jsonString = messageFormatter.FormatMessage(null, "Require fields not found", false, null);
        res.end(jsonString);
    }
};