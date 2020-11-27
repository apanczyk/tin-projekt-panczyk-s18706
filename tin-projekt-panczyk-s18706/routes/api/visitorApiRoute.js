const express = require('express');
const router = express.Router();

const visitorApiController = require('../../api/VisitorAPI');

router.get('/', visitorApiController.getVisitors);
router.get('/:visitorId', visitorApiController.getVisitorById);
router.post('/', visitorApiController.createVisitor);
router.put('/:visitorId', visitorApiController.updateVisitor);
router.delete('/:visitorId', visitorApiController.deleteVisitor);

module.exports = router;