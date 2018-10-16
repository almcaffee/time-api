var timeController = function () {
    var timeModel = require('./controllers/timeModel')();
    var path = require('path');

    var getTime = function (req, res) {
        if (!req.paramsid) {
            return res.status(400).json({ error: { message: 'User id required', required: ['id'] }});
        } else {
            timeModel.getTime(req.params.id, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     res.status(200).json(rows[0]);
                   } else {
                     res.status(404).json({ error: { message: 'No time entries found for this user'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error } });
                }
            });
        }
    };

    var getTimeByPeriod = function (req, res) {
        if (!req.body.startDate) {
            return res.status(401).json({ error: { message: 'Start date required', required: ['startDate'] }});
        } else if (!req.body.endDate) {
            return res.status(401).json({ error: { message: 'End date required', required: ['endDate'] }});
        } else {
            timeModel.getTimeByPeriod(req.body.startDate, req.body.endDate, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     res.status(200).json(rows[0]);
                   } else {
                     res.status(404).json({ error: { message: 'No time entries found for this user'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error } });
                }
            });
        }
    };

    return {
        getTime: getTime,
        getTimeByPeriod: getTimeByPeriod
    };
};

module.exports = timeController;
