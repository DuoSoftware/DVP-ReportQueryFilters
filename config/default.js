module.exports = {
    "Security": {
        "ip": "",
        "port": 6389,
        "user": "",
        "password": "",
        "mode": "sentinel",//instance, cluster, sentinel
        "sentinels": {
            "hosts": "",
            "port": 16389,
            "name": "redis-cluster"
        }
    },
    "Mongo": {
        "ip": "",
        "port": "27017",
        "dbname": "",
        "password": "",
        "user": "",
        "replicaset": ""
    },
    "Host": {
        "domain": "0.0.0.0",
        "port": 8846,
        "version": "1.0.0.0",
        "hostpath": "./config",
        "logfilepath": ""
    }
};
