var loginModel = function () {

    const getConnection = require('./connection');

    var login =  function(user, lastname, callback) {
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

    return {
        login: login
    };
};

module.exports = loginModel;
