var apiController = function () {
    var apiModel = require('./apiModel')();
    var path = require('path');
    var fs = require("fs");

    var apiLogin = function (req, res) {
        if (!req.params.id) {
            return res.status(400).json({ error: { message: 'Unauthorized, id is required', required: ['id'] }});
        } else if (!req.params.lastname) {
            return res.status(400).json({ error: { message: 'Unauthorized, last name is required', required: ['lastname'] }});
        } else {
            apiModel.apiLogin(req.params.id, req.params.lastname, function (err, rows) {
                if (!err) {
                    res.status(200).json(rows[0]);
                } else {
                    res.status(500).json({ error: { message: err.error} });
                }
            });
        }
    };

    var getDepartment = function (req, res) {
        if (!req.params.id) {
            return res.status(401).json({ error: { message: 'Department ID required', required: ['id'] }});
        } else {
            apiModel.getDepartment(req.params.id, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     res.status(200).json(rows[0]);
                   } else {
                     res.status(404).json({ error: { message: 'Department not found'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error} });
                }
            });
        }
    };

    var getAllDepartments = function (req, res) {
        apiModel.getAllDepartments(function (err, rows) {
            if (!err) {
              res.status(200).json(rows);
            } else {
              res.status(500).json({ error: { message: err.error} });
            }
        });
    };

    var getProfile = function (req, res) {
        if (!req.params.id) {
            return res.status(401).json({ error: { message: 'Profile ID required', required: ['id'] }});
        } else {
            apiModel.getProfile(req.params.id, function (err, rows) {
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

    var getProfileImage = function (req, res) {
      apiModel.getProfileImage(req.params.id, function (err, rows) {
        var file = __dirname + '/public/profiles/img/';
        if (!err) {
           if(rows.length > 0) {
             file+= rows[0];
           } else {
             file+= 'default.png';
           }
        } else {
            file+= 'default.png';
        }
        console.log(file)
        res.status(200).sendFile(file);
      });
    };

    var getTime = function (req, res) {
        if (!req.params.id) {
            return res.status(400).json({ error: { message: 'Id required', required: ['id'] }});
        } else {
            apiModel.getTime(req.params.id, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     rows.forEach(r=> r.editable = (r.editable === 'true'));
                     res.status(200).json(rows);
                   } else {
                     res.status(404).json({ error: { message: 'No time entries found for this user'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error } });
                }
            });
        }
    };

    var getTimeByDate = function (req, res) {
        if (!req.params.date) {
            return res.status(401).json({ error: { message: 'Date required', required: ['date'] }});
        } else if (!req.params.id) {
            return res.status(401).json({ error: { message: 'Id required', required: ['id'] }});
        } else {
            apiModel.getTimeByDate(req.params.id, req.params.date, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     rows.forEach(r=> r.editable = (r.editable === 'true'));
                     res.status(200).json(rows);
                   } else {
                     res.status(404).json({ error: { message: 'No time entries found for this date'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error } });
                }
            });
        }
    };

    var getAllTimeByDate = function (req, res) {
        if (!req.params.date) {
            return res.status(401).json({ error: { message: 'Date required', required: ['date'] }});
        } else {
            apiModel.getAllTimeByDate(req.params.date, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     rows.forEach(r=> r.editable = (r.editable === 'true'));
                     res.status(200).json(rows);
                   } else {
                     res.status(404).json({ error: { message: 'No time entries found for '+req.params.date } });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error } });
                }
            });
        }
    };

    var getTimeByPeriod = function (req, res) {
        if (!req.params.start) {
            return res.status(401).json({ error: { message: 'Start date required', required: ['start'] }});
        } else if (!req.params.end) {
            return res.status(401).json({ error: { message: 'End date required', required: ['end'] }});
        } else if (!req.params.id) {
            return res.status(401).json({ error: { message: 'Id required', required: ['id'] }});
        } else {
            apiModel.getTimeByPeriod(req.params.id, req.params.start, req.params.end, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     rows.forEach(r=> r.editable = (r.editable === 'true'));
                     res.status(200).json(rows);
                   } else {
                     res.status(404).json({ error: { message: 'No time entries found for this user'} });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error } });
                }
            });
        }
    };

    var getAllTimeByPeriod = function (req, res) {
        if (!req.params.start) {
            return res.status(401).json({ error: { message: 'Start date required', required: ['start'] }});
        } else if (!req.params.end) {
            return res.status(401).json({ error: { message: 'End date required', required: ['end'] }});
        } else {
            apiModel.getAllTimeByPeriod(req.params.start, req.params.end, function (err, rows) {
                if (!err) {
                   if(rows.length > 0) {
                     res.status(200).json(rows);
                   } else {
                     res.status(404).json({ error: { message: 'No time entries for the period starting '+res.body.start+' and ending '+res.body.end } });
                   }
                } else {
                    res.status(500).json({ error: { message: err.error } });
                }
            });
        }
    };

    var getTimeCodes = function (req, res) {
        apiModel.getTimeCodes(function (err, rows) {
            if (!err) {
               res.status(200).json(rows);
            } else {
               res.status(500).json({ error: { message: err.error } });
            }
        });
    };

    // fs.readFile( req.file.path, function (err, data) {
    //     fs.writeFile(file, data, function (err) {
    //      if( err ){
    //           console.error( err );
    //           response = {
    //                message: 'Sorry, file couldn\'t be uploaded.',
    //                filename: req.file.originalname
    //           };
    //      }else{
    //            response = {
    //                message: 'File uploaded successfully',
    //                filename: req.file.originalname
    //           };
    //       }
    //       res.end( JSON.stringify( response ) );
    //    });
    // });

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
        getTimeCodes: getTimeCodes
    };
};

module.exports = apiController;
