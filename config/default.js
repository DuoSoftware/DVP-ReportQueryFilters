module.exports = {
    "Security": {
        "ip": "45.55.142.207",
        "port": 6389,
        "user": "duo",
        "password": "DuoS123",
        "mode": "sentinel",//instance, cluster, sentinel
        "sentinels": {
            "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
            "port": 16389,
            "name": "redis-cluster"
        }
    },
    "Mongo": {
        "ip": "104.236.231.111",
        "port": "27017",
        "dbname": "dvpdb",
        "password": "DuoS123",
        "user": "duo",
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
