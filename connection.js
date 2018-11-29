var mysql = require('mysql');
var maxListen = require('events').EventEmitter.prototype._maxListeners = 0;
var pool = mysql.createPool({
    connectionLimit : 25,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USR,
    password        : process.env.DB_AUTH,
    database        : process.env.DB_TBL,
    acquireTimeout: 1000,
    debug: false
});

var getConnection = function (callback) {
    pool.getConnection(function (err, connection) {
        /**
         * If there's an error while getting a connection then pass back
         * a status of 500 and with an error message. If at any time there is a DB connection
         * error then do the same.
         */
        if (err) {
            callback({code: 500, message: "Error in connection database"});
            return;
        } else {
            console.log('DB connection success');
            connection.removeAllListeners('error');
            connection.on('error', function (err) {
                connection.release();
                callback({code: 500, message: "Error in connection database", err: err});
            });
        }
        callback(err, connection);
    });
};

module.exports = getConnection;
