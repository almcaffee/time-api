var timeModel = function () {

    const getConnection = require('./connection');

    var getTime =  function(id, callback) {
      function findTime(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time WHERE id = "+connection.escape(id)+" GROUP BY timesheetid ORDER BY date";
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

    var getTimeByPeriod =  function(start, end, callback) {
      function findTimeByPeriod(err, connection) {
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
      getConnection(findTimeByPeriod);
    };

    return {
        getTime: getTime,
        getTimeByPeriod: getTimeByPeriod
    };
};

module.exports = timeModel;
