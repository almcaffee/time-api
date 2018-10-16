var loginController = function () {
    var loginModel = require('../models/loginModel')();
    var path = require('path');

    var login = function (req, res) {
        if (!req.params.user) {
            return res.status(400).json({ error: { message: 'Unauthorized, user name is required', required: ['user'] }});
        } else if (!req.params.lastname) {
            return res.status(400).json({ error: { message: 'Unauthorized, last name is required', required: ['lastname'] }});
        } else {
            loginModel.login(req.params.user, req.params.lastname, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     res.status(200).json(rows[0]);
                   } else {
                     res.status(404).json({ error: { message: 'Unable to login with those credentials'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error} });
                }
            });
        }
    };

    return {
        login: login
    };
};

module.exports = loginController;
