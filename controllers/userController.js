var userController = function () {
    var userModel = require('./models/userModel')();
    var path = require('path');

    var getProfile = function (req, res) {
        if (!req.params.id) {
            return res.status(401).json({ error: { message: 'Employee ID required', required: ['id'] }});
        } else {
            userModel.getProfile(req.params.id, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     res.status(200).json(rows[0]);
                   } else {
                     res.status(404).json({ error: { message: 'User not found'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error} });
                }
            });
        }
    };

    return {
        getProfile: getProfile
    };
};

module.exports = userController;
