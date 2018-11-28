var loginModel = function () {

    const getConnection = require('./connection');

    var login =  function(user, lastname, callback) {
      function loginProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT e.*, r.name AS role FROM employees e"
              select += " LEFT OUTER JOIN time_roles r ON r.id = e.roleid";
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
      getConnection(loginProfile);
    };

    return {
        login: login
    };
};

module.exports = loginModel;
