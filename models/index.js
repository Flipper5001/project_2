const Tag = require('./Tag');
const User = require('./User');
const Workout = require('./Workout');
const WorkoutTag = require('./WorkoutTag');

User.hasMany(Workout, {
  foreignKey: 'user_id'
})

Workout.belongsTo(User, {
  foreignKey: 'user_id'
})

Workout.belongsToMany(Tag, {
  through: {
    model: WorkoutTag,
    unique: false,
  },
  as: 'tags',
  foreignKey: 'workout_id'
})

Tag.belongsToMany(Workout, {
  through: {
    model: WorkoutTag,
    unique: false,
  },
  as: 'workouts',
  foreignKey: 'tag_id'
})

module.exports = {
  Tag, User, Workout, WorkoutTag
};
