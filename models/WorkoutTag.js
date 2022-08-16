const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Workout = require('./Workout');
const Tag = require('./Tag');

class WorkoutTag extends Model {}

WorkoutTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Workout,
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tag,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workout_tag',
  }
);

module.exports = WorkoutTag;
