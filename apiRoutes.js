var routes = function () {
    var express = require('express');
    var apiRouter = express.Router();
    var apiController = require('./apiController')();

    // Get
    apiRouter.get('/login/user/:user/lastname/:lastname', apiController.apiLogin);
    apiRouter.get('/profile/:id', apiController.getProfile);
    apiRouter.get('/time/:employeeid', apiController.getTime);
    // apiRouter.get('/profile/:id/date/:date', apiController.getDate);
    // apiRouter.get('/profile/:id/year/:yr', apiController.getYear);
    // apiRouter.get('/profile/:id/month/:mo/year/:yr', apiController.getMonth);

    // Post
    // apiRouter.post('/profile/:id/time', apiController.insertTime);
    // apiRouter.post('/profile/create', apiController.insertProfile);
    apiRouter.post('/time/period', apiController.getTimeByPeriod);


    // Delete
    // apiRouter.delete('/profile/:id', apiController.deleteProfile);

    // PUT
    // apiRouter.put('/profile/:id', apiController.updateProfile);
    // apiRouter.put('/profile/:id/date/:date', apiController.inserttDate);


    return apiRouter;
};

module.exports = routes;
