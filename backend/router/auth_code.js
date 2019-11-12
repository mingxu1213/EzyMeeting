var express = require('express');
var router = express.Router();
var authHelper = require('../auth');

router.get('/', (req, res, next) => {
    var url = authHelper.getAuthUrl();
    res.send(url);
})


module.exports = router;