const router = require('express').Router();
const { Workout, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all workouts and JOIN with user data
    const workoutData = await Workout.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      workouts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('newworkout', {
      // check if user is logged in
      logged_in: req.session.logged_in
  })
})

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
      const workoutData = await Workout.findByPk(req.params.id, {
        include: [
          {
              model: User,
              attributes: ['name'],
          },
        ],
      });
      const workout = workoutData.get({ plain: true });

      res.render('editworkout', {
          workout,
          logged_in: req.session.logged_in,
      });
  } catch (error) {
      res.status(500).json(error)
  }
})

router.get('/workouts/:id', async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const workout = workoutData.get({ plain: true });

    res.render('workout', {
      workout,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login auth to ensure user is logged in prior to access page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
      // find all workouts
      const workoutData = await Workout.findAll({
          where: {
              user_id: req.session.user_id,
          },
          include: [
              { 
                  model: User,
                  attributes: ['name'],
              }
          ],
      });
      
      // convert to plain to read data
      const workouts = workoutData.map((workout) => workout.get({ plain: true }));

      // render post page with logged in true and display relevant workouts
      res.render('dashboard', {
          workouts,
          logged_in: req.session.logged_in
      });
  } catch (error) {
      res.status(500).json(error)
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }

  res.render('signup');
});

// when post logout, destroy session
router.get('/logout', (req, res) => {
  // check if user is actually logged in
  if (req.session.logged_in) {
      // end and destroy session
    req.session.destroy(() => {
      res.redirect('/login');
      res.status(204).end();
    });
  } else {
      // if user was not logged in end and send error
    res.status(404).end();
  }
});

module.exports = router;
