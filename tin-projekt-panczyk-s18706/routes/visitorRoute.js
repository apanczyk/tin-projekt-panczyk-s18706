const express = require('express');
const router = express.Router();
const visitorControler = require('../controllers/visitorController');


router.get('/', visitorControler.showVisitorList);
router.get('/add', visitorControler.showAddVisitorForm);
router.get('/edit/:visitorId', visitorControler.showEditVisitorForm);
router.get('/details/:visitorId', visitorControler.showVisitorDetails);
router.post('/add', visitorControler.addVisitor);
router.post('/edit', visitorControler.updateVisitor);
router.get('/delete/:visitorId', visitorControler.deleteVisitor);

module.exports = router;