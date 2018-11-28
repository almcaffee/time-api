var userModel = function () {

    const getConnection = require('./connection');

    var getProfile =  function(user, lastname, callback) {
      function searchProfile(err, connection) {
            if (err) {
                callback({code: 500, message: "There was an error while connecting to the database", err: err});
            } else {
              var select = "SELECT e.*, r.name AS role FROM employees e"
              select += " LEFT OUTER JOIN time_roles r ON r.id = e.roleid";
              select += " WHERE e.employeeid = "+connection.escape(id);
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
        getProfile: getProfile
    };
};

module.exports = userModel;
