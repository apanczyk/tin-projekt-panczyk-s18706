const express = require('express');
const router = express.Router();
const visitorControler = require('../controllers/visitorController');


router.get('/', visitorControler.showVisitorList);
router.get('/add', visitorControler.showVisitorAdd);
router.get('/details/:visitorId', visitorControler.showVisitorDetails);
router.get('/edit/:visitorId', visitorControler.showVisitorEdit);

module.exports = router;