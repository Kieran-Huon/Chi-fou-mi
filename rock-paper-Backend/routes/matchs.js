const {
  getAllMatch,
  getMatchById,
  addPersonToMatch,
  subscribeToMatchEvents,
  gameTurn,
  createMatch,
} = require('../controller');

const router = require('express').Router();

const auth = require('../middleware/auth');

router.get('/', auth, getAllMatch);
router.post('/', auth, createMatch);
router.get('/:id', auth, getMatchById);
router.post('/:id', auth, addPersonToMatch);
router.post('/:id/turns/:idTurn', gameTurn);
router.get('/:id/subscribe/:userId', subscribeToMatchEvents);
module.exports = router;
