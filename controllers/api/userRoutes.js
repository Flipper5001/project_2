const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // create new user
    const userData = await User.create(req.body);
    // register user_id and state logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
      if (!userData) {
        res.status(400).json({ message: 'Incorrect username or password' });
        return;
      }
      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect username or password' });
          return;
      }
        
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.redirect('/dashboard')
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

// when post logout, destroy session
router.post('/logout', (req, res) => {
    // check if user is actually logged in
    if (req.session.logged_in) {
        // end and destroy session
      req.session.destroy(() => {
        res.redirect('/login')
        res.status(204).end();
      });
    } else {
        // if user was not logged in end and send error
      res.status(404).end();
    }
  });

module.exports = router