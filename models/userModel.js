var userModel = function () {

    const getConnection = require('./connection');

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

    return {
        getProfile: getProfile
    };
};

module.exports = userModel;
