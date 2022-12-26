const router = require('express').Router();

router.use(require('./user'));
router.use('/matches', require('./matchs'));

module.exports = router;
