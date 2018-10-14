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

    var getProfile =  function(user, lastname, callback) {
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
      function searchProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE employeeid = "+connection.escape(employeeid)+" GROUP BY timesheetid ORDER BY date";
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

    var getTimeByPeriod =  function(start, end, callback) {
      function searchProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE employeeid = "+connection.escape(employeeid);
              select+= " WHERE STR_TO_DATE(date, '%Y-%m-%d') >= STR_TO_DATE("+connection.escape(start)+", '%Y-%m-%d')";
              select+= " AND STR_TO_DATE(date, '%Y-%m-%d') <= STR_TO_DATE("+connection.escape(end)+", '%Y-%m-%d')";
              select+= " GROUP BY timesheetid ORDER BY date";
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
      getConnection(searchProfile);
    };

    return {
        apiLogin: apiLogin,
        getProfile: getProfile,
        getTime: getTime,
        getTimeByPeriod: getTimeByPeriod
    };
};

module.exports = apiModel;
