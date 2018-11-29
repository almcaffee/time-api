var apiModel = function () {

    const getConnection = require('./connection');

    var apiLogin =  function(id, lastname, callback) {
      function loginProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT t.*, r.name AS role FROM time_profiles t"
              select += " LEFT OUTER JOIN time_roles r ON r.id = t.roleid";
              select += " WHERE t.id = "+connection.escape(id)+" AND lastname = "+connection.escape(lastname);
              console.log(select)
              connection.query(select, function (err, rows) {
                  connection.release();
                  if (err) {
                    console.log(err)
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
              var select = "SELECT e.*, r.name AS role FROM employees e"
              select += " LEFT OUTER JOIN time_roles r ON r.id = e.roleId";
              select += " WHERE employeeid = "+connection.escape(user)+" AND lastname = "+connection.escape(lastname);
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

    /* Returns all time by id */
    var getTime =  function(id, callback) {
      function findTime(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE id = "+connection.escape(id);
              if(id === 1 || id === '1') select+= " OR employeeid = '00001'";
              select+= " ORDER BY date desc";
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
      getConnection(findTime);
    };

    /* Returns all time by id, date */
    var getTimeByDate =  function(id, date, callback) {
      function findTimeByPeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE employeeid = "+connection.escape(id);
              select+= " AND STR_TO_DATE(date, '%Y-%m-%d') = STR_TO_DATE("+connection.escape(date)+", '%Y-%m-%d')";
              select+= " GROUP BY timesheetid ORDER BY date desc";
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
      getConnection(findTimeByPeriod);
    };

    /* Returns all time by date */
    var getAllTimeByDate =  function(date, callback) {
      function findTimeByPeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE STR_TO_DATE(date, '%Y-%m-%d') = STR_TO_DATE("+connection.escape(date)+", '%Y-%m-%d')";
              select+= " GROUP BY timesheetid ORDER BY date desc";
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
      getConnection(findTimeByPeriod);
    };

    /* Returns all time between start/end by id */
    var getTimeByPeriod =  function(id, start, end, callback) {
      function findTimeByPeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE employeeid = "+connection.escape(id);
              select+= " AND STR_TO_DATE(date, '%Y-%m-%d') >= STR_TO_DATE("+connection.escape(start)+", '%Y-%m-%d')";
              select+= " AND STR_TO_DATE(date, '%Y-%m-%d') <= STR_TO_DATE("+connection.escape(end)+", '%Y-%m-%d')";
              select+= " GROUP BY timesheetid ORDER BY date desc";
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
      getConnection(findTimeByPeriod);
    };

    /* Returns all time between start/end */
    var getAllTimeByPeriod =  function(start, end, callback) {
      function findTimeByPeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE STR_TO_DATE(date, '%Y-%m-%d') >= STR_TO_DATE("+connection.escape(start)+", '%Y-%m-%d')";
              select+= " AND STR_TO_DATE(date, '%Y-%m-%d') <= STR_TO_DATE("+connection.escape(end)+", '%Y-%m-%d')";
              select+= " GROUP BY timesheetid ORDER BY date desc";
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
      getConnection(findTimeByPeriod);
    };

    var getTimeCodes =  function(callback) {
      function getCodes(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * from time_types"
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
      getConnection(getCodes);
    };

    return {
        apiLogin: apiLogin,
        getProfile: getProfile,
        getAllTimeByDate: getAllTimeByDate,
        getAllTimeByPeriod: getAllTimeByPeriod,
        getTime: getTime,
        getTimeByDate: getTimeByDate,
        getTimeByPeriod: getTimeByPeriod,
        getTimeCodes: getTimeCodes,
    };
};

module.exports = apiModel;
