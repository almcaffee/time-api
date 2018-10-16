var apiModel = function () {

    const getConnection = require('./connection');

    var apiLogin =  function(user, lastname, callback) {
      function loginProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM employees WHERE employeeid = "+connection.escape(user)+" AND lastname = "+connection.escape(lastname);
              connection.query(select, function (err, rows) {
                  connection.release();
                  if (err) {
                    callback({ code: 500, err: err });
                  } else {
                    callback(null, rows);
                  }
              });
            }
      }
      getConnection(loginProfile);
    };

    var getProfile =  function(id, callback) {
      function searchProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM employees WHERE employeeid = "+connection.escape(id);
              connection.query(select, function (err, rows) {
                  connection.release();
                  if (err) {
                    callback({ code: 500, err: err });
                  } else {
                    callback(null, rows);
                  }
              });
            }
      }
      getConnection(searchProfile);
    };

    var getTime =  function(employeeid, callback) {
      function searchTime(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT timesheetid, date, timetype, hours FROM time WHERE employeeid = "+connection.escape(employeeid);
              connection.query(select, function (err, rows) {
                  connection.release();
                  if (err) {
                    callback({ code: 500, err: err });
                  } else {
                    callback(null, rows);
                  }
              });
            }
      }
      getConnection(searchTime);
    };

    var getTimeByPeriod =  function(id, start, end, callback) {
      function searchTimePeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT timesheetid, date, timetype, hours FROM time WHERE employeeid = "+connection.escape(id);
              select+= " AND STR_TO_DATE(date, '%Y-%m-%d') >= STR_TO_DATE("+connection.escape(start)+", '%Y-%m-%d')";
              select+= " AND STR_TO_DATE(date, '%Y-%m-%d') <= STR_TO_DATE("+connection.escape(end)+", '%Y-%m-%d')";
              select+= " ORDER BY date";
              console.log(select)
              connection.query(select, function (err, rows) {
                  connection.release();
                  if (err) {
                    callback({ code: 500, err: err });
                  } else {
                    callback(null, rows);
                  }
              });
            }
      }
      getConnection(searchTimePeriod);
    };

    return {
        apiLogin: apiLogin,
        getProfile: getProfile,
        getTime: getTime,
        getTimeByPeriod: getTimeByPeriod
    };
};

module.exports = apiModel;
