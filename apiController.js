var apiController = function() {
    var apiModel = require('./apiModel')();
    var path = require('path');
    var fs = require("fs");

    // function to encode file data to base64 encoded string
    var convertImgFile = function(file) {
        // read binary data
        var imgString = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(imgString).toString('base64');
    }

    var apiLogin = function(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Unauthorized, id is required', required: ['id'] });
        } else if (!req.params.lastname) {
            return res.status(400).json({ message: 'Unauthorized, last name is required', required: ['lastname'] });
        } else {
            apiModel.apiLogin(req.params.id, req.params.lastname, function(err, rows) {
                if (!err) {
                    // Making seperate call to get photo
                    // if(rows[0].img) {
                    //   var pImg = __dirname + '/public/profiles/img/'+rows[0].img;
                    //   var obj = rows[0];
                    //   obj['img'] = convertImgFile(pImg);
                    //   console.log(obj)
                    //   res.status(200).json(obj);
                    // } else {
                    //   console.log(rows[0])
                    //   res.status(200).json(rows[0]);
                    // }
                    res.status(200).json(rows[0]);
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getDepartment = function(req, res) {
        if (!req.params.id) {
            return res.status(401).json({ message: 'Department ID required', required: ['id'] });
        } else {
            apiModel.getDepartment(req.params.id, function(err, rows) {
                if (!err) {
                    if (rows.length > 0) {
                        res.status(200).json(rows[0]);
                    } else {
                        res.status(404).json({ message: 'Department not found' });
                    }
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getAllDepartments = function(req, res) {
        apiModel.getAllDepartments(function(err, rows) {
            if (!err) {
                res.status(200).json(rows);
            } else {
                res.status(500).json({ message: err.error });
            }
        });
    };

    var getProfile = function(req, res) {
        if (!req.params.id) {
            return res.status(401).json({ message: 'Profile ID required', required: ['id'] });
        } else {
            apiModel.getProfile(req.params.id, function(err, rows) {
                if (!err) {
                    if (rows.length > 0) {
                        // Making seperate call to get photo
                        // if(rows[0].img) {
                        //   var pImg = __dirname + '/public/profiles/img/'+rows[0].img;
                        //   var obj = rows[0];
                        //   obj['img'] = convertImgFile(pImg);
                        //   console.log(obj)
                        //   res.status(200).json(obj);
                        // } else {
                        //   console.log(rows[0])
                        //   res.status(200).json(rows[0]);
                        // }
                        res.status(200).json(rows[0]);
                    } else {
                        res.status(404).json({ message: 'User not found' });
                    }
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getProfileImage = function(req, res) {
        apiModel.getProfileImage(req.params.id, function(err, rows) {
            var file = __dirname + '/public/profiles/img/';
            if (!err) {
                if (rows.length > 0) {
                    file += rows[0].img;
                } else {
                    file += 'default.png';
                }
            } else {
                file += 'default.png';
            }
            console.log(file)
            res.status(200).sendFile(file);
        });
    };

    var getTime = function(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: 'Id required', required: ['id'] });
        } else {
            apiModel.getTime(req.params.id, function(err, rows) {
                if (!err) {
                    if (rows.length > 0) {
                        rows.forEach(r => r.editable = (r.editable === 'true'));
                        res.status(200).json(rows);
                    } else {
                        res.status(404).json({ message: 'No time entries found for this user' });
                    }
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getTimeByDate = function(req, res) {
        if (!req.params.date) {
            return res.status(401).json({ message: 'Date required', required: ['date'] });
        } else if (!req.params.id) {
            return res.status(401).json({ message: 'Id required', required: ['id'] });
        } else {
            apiModel.getTimeByDate(req.params.id, req.params.date, function(err, rows) {
                if (!err) {
                    if (rows.length > 0) {
                        rows.forEach(r => r.editable = (r.editable === 'true'));
                        res.status(200).json(rows);
                    } else {
                        res.status(404).json({ message: 'No time entries found for this date' });
                    }
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getAllTimeByDate = function(req, res) {
        if (!req.params.date) {
            return res.status(401).json({ message: 'Date required', required: ['date'] });
        } else {
            apiModel.getAllTimeByDate(req.params.date, function(err, rows) {
                if (!err) {
                    if (rows.length > 0) {
                        rows.forEach(r => r.editable = (r.editable === 'true'));
                        res.status(200).json(rows);
                    } else {
                        res.status(404).json({ message: 'No time entries found for ' + req.params.date });
                    }
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getTimeByPeriod = function(req, res) {
        if (!req.params.start) {
            return res.status(401).json({ message: 'Start date required', required: ['start'] });
        } else if (!req.params.end) {
            return res.status(401).json({ message: 'End date required', required: ['end'] });
        } else if (!req.params.id) {
            return res.status(401).json({ message: 'Id required', required: ['id'] });
        } else {
            apiModel.getTimeByPeriod(req.params.id, req.params.start, req.params.end, function(err, rows) {
                if (!err) {
                    if (rows.length > 0) {
                        rows.forEach(r => r.editable = (r.editable === 'true'));
                        res.status(200).json(rows);
                    } else {
                        res.status(404).json({ message: 'No time entries found for this user' });
                    }
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getAllTimeByPeriod = function(req, res) {
        if (!req.params.start) {
            return res.status(401).json({ message: 'Start date required', required: ['start'] });
        } else if (!req.params.end) {
            return res.status(401).json({ message: 'End date required', required: ['end'] });
        } else {
            apiModel.getAllTimeByPeriod(req.params.start, req.params.end, function(err, rows) {
                if (!err) {
                    if (rows.length > 0) {
                        res.status(200).json(rows);
                    } else {
                        res.status(404).json({ message: 'No time entries for the period starting ' + res.body.start + ' and ending ' + res.body.end });
                    }
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
    };

    var getTimeCodes = function(req, res) {
        apiModel.getTimeCodes(function(err, rows) {
            if (!err) {
                res.status(200).json(rows);
            } else {
                res.status(500).json({ message: err.error });
            }
        });
    };

    var setTimeByDate = function(req, res) {
        let requiredFields = ['profileId', 'hours', 'timeCode', 'date', 'updaterId'];
        let missingFields = [];
        requiredFields.forEach(key => {
            if (!req.body[key]) missingFields.concat(key);
        });
        if (missingFields.length) {
            msg += "The";
            missingRequiredFields.forEach((v, i) => {
                if (i === 0) {
                    msg += ` ${v}`;
                } else if (i > 0 && i === (missingRequiredFields.length - 1)) {
                    if (missingRequiredFields.length > 2) msg += `, `;
                    msg += ` and ${v}`;
                } else {
                    msg += `, ${v}`;
                }
            });
            msg += missingRequiredFields.length > 1 ? ' are' : ' is';
            msg += " required.";
            return res.status(401).json({ message: msg, required: missingFields });
        } else {
            apiModel.setTimeByDate(req.body, function(err, rows) {
                if (!err) {
                    res.status(200).json(rows);
                } else {
                    res.status(500).json({ message: err.error });
                }
            });
        }
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
        getTimeCodes: getTimeCodes,
        setTimeByDate: setTimeByDate
    };
};

module.exports = apiController;