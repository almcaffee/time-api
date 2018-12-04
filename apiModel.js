var apiModel = function () {
    const moment = require('moment');
    const getConnection = require('./connection');

    var apiLogin =  function(id, lastname, callback) {
      function loginProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT t.*, r.name AS role FROM time_profiles t"
              select += " LEFT OUTER JOIN time_roles r ON r.id = t.roleid";
              select += " WHERE t.id = "+connection.escape(id)+" AND lastName = "+connection.escape(lastname);
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
      getConnection(loginProfile);
    };

    var getDepartment =  function(id, callback) {
      function getDepartment(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time_departments WHERE id = "+connection.escape(id);
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
      getConnection(getDepartment);
    };

    var getAllDepartments =  function(callback) {
      function getDepartment(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT * FROM time_departments";
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
      getConnection(getDepartment);
    };

    var getProfile =  function(id, callback) {
      function searchProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT t.*, r.name AS role FROM time_profiles t"
              select += " LEFT OUTER JOIN time_roles r ON r.id = t.roleid";
              select += " WHERE t.id = "+connection.escape(id);
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

    var getProfileImage =  function(id, callback) {
      function searchProfileImage(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT img FROM time_profiles WHERE t.id = "+connection.escape(id)+" AND img IS NOT NULL";
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
      getConnection(searchProfileImage);
    };

    /* Returns all time by id */
    var getTime =  function(id, callback) {
      function findTime(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT *, IF(editable = '1', 'true', 'false') as editable FROM time_entry WHERE profileId = "+connection.escape(id)+" ORDER BY date desc";
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
              var select = "SELECT *, IF(editable='1', 'true', 'false') as editable FROM time_entry WHERE employeeid = "+connection.escape(id);
              // if(type of date === 'number')
              console.log(typeof date)
              select+= " AND date = "+connection.escape(date);
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
      getConnection(findTimeByPeriod);
    };

    /* Returns all time by date */
    var getAllTimeByDate =  function(date, callback) {
      function findTimeByPeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT *, IF(editable='1', 'true', 'false') as editable FROM time_entry WHERE date = "+connection.escape(date);
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
      getConnection(findTimeByPeriod);
    };

    /* Returns all time between start/end by id */
    var getTimeByPeriod =  function(id, start, end, callback) {
      function findTimeByPeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT *, IF(editable='1', 'true', 'false') as editable FROM time_entry WHERE profileId = "+connection.escape(id);
              if(start.match(/[0-9]/)) {
                var s = moment(parseInt(start)).format('YYYY-MM-DD');
                select+= " AND date >= "+connection.escape(s);
              } else {
                select+= " AND date >= "+connection.escape(start);
              }
              if(end.match(/[0-9]/)) {
                var e = moment(parseInt(end)).format('YYYY-MM-DD');
                select+= " AND date <= "+connection.escape(e);
              } else {
                select+= " AND date <= "+connection.escape(end);
              }
              select+= " ORDER BY date desc";
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
      getConnection(findTimeByPeriod);
    };

    /* Returns all time between start/end */
    var getAllTimeByPeriod =  function(start, end, callback) {
      function findTimeByPeriod(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT *, IF(editable='1', 'true', 'false') as editable FROM time_entry WHERE ";
              if(start.match(/[0-9]/)) {
                var s = moment(parseInt(start)).format('YYYY-MM-DD');
                select+= "date >= "+connection.escape(s);
              } else {
                select+= "date >= "+connection.escape(start);
              }
              if(end.match(/[0-9]/)) {
                var e = moment(parseInt(end)).format('YYYY-MM-DD');
                select+= " AND date <= "+connection.escape(e);
              } else {
                select+= " AND date <= "+connection.escape(end);
              }
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
        getAllDepartments: getAllDepartments,
        getDepartment: getDepartment,
        getProfile: getProfile,
        getProfileImage: getProfileImage,
        getAllTimeByDate: getAllTimeByDate,
        getAllTimeByPeriod: getAllTimeByPeriod,
        getTime: getTime,
        getTimeByDate: getTimeByDate,
        getTimeByPeriod: getTimeByPeriod,
        getTimeCodes: getTimeCodes,
    };
};

module.exports = apiModel;
