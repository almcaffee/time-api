var routes = function () {
    var express = require('express');
    var apiRouter = express.Router();
    var apiController = require('./apiController')();

    // Get
    apiRouter.get('/login/user/:user/lastname/:lastname', apiController.apiLogin);
    apiRouter.get('/profile/id/:id', apiController.getProfile);
    apiRouter.get('/time/date/:date', apiController.getAllTimeByDate);
    apiRouter.get('/time/id/:employeeid/date/:date', apiController.getTimeByDate);
    apiRouter.get('/time/id/:employeeid', apiController.getTime);
    apiRouter.get('/time/id/:id/start/:start/end/:end', apiController.getTimeByPeriod);
    apiRouter.get('/time/start/:start/end/:end', apiController.getAllTimeByPeriod);
    // apiRouter.get('/profile/:id/date/:date', apiController.getDate);
    // apiRouter.get('/profile/:id/year/:yr', apiController.getYear);
    // apiRouter.get('/profile/:id/month/:mo/year/:yr', apiController.getMonth);

    // Post
    // apiRouter.post('/profile', apiController.createProfile);
    // apiRouter.post('/time', apiController.insertTime);

    // Delete
    // apiRouter.delete('/profile/:id', apiController.deleteProfile);
    // apiRouter.delete('/time/:id', apiController.deleteTime);

    // PUT
    // apiRouter.put('/profile', apiController.updateProfile);
    // apiRouter.put('/time/date', apiController.updateTimeByDate);
    // apiRouter.put('/time/:id', apiController.updateTimeById);


    return apiRouter;
};

module.exports = routes;
