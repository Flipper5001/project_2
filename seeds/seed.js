const sequelize = require('../config/connection');
const { Tag, User, Workout, WorkoutTag} = require('../models');

const userData = require('./userData.json');
const tagData = require('./tagData.json');
const workoutData = require('./workoutData.json');
const workoutTagData = require('./workoutTagData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.create({
      ...user,
    });
  }

  for (const tag of tagData) {
    await Tag.create({
      ...tag,
    });
  }

  for (const workout of workoutData) {
    await Workout.create({
      ...workout,
    });
  }

  for (const workoutTag of workoutTagData) {
    await WorkoutTag.create({
      ...workoutTag,
    });
  }

  process.exit(0);
};

seedDatabase();
