const router = require('express').Router();
const { Workout, WorkoutTag } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const workoutTag = await WorkoutTag.create({
      tag_id: req.body.tag_id,
      workout_id: newWorkout.id
    })

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id', async (req, res) => {
  const originalWorkout = await Workout.findByPk(req.params.id)

  const workout = originalWorkout.get({ plain: true });

  const { name, description, duration, optional } = workout 

  const newWorkoutData = await Workout.create({
    name,
    description,
    duration,
    optional,
    user_id: req.session.user_id
  })
  res.status(200).json(newWorkoutData);
})

router.put('/:id', async (req, res) => {
  try {
    const workoutData = await Workout.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    if (!workoutData) {
      res.status(404).json({ message: 'No workout with this ID!' });
      return;
    }
    
    res.status(200).json(workoutData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: 'No workout with this ID!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
