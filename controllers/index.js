const router = require('express').Router();
const apiRoutes = require('./api');
const webRoutes = require('./webRoutes');

router.use('/api', apiRoutes);
router.use('/', webRoutes);

module.exports = router;