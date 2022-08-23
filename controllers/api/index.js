const router = require('express').Router();
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const tagRoutes = require('./tagRoutes')

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/tags', tagRoutes);

module.exports = router;