const { WorkoutTag, Workout, User, Tag } = require('../../models');

const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const core = await WorkoutTag.count({
            where: {tag_id: 1}
        })
        const legs = await WorkoutTag.count({
            where: {tag_id: 2}
        })
        const arms = await WorkoutTag.count({
            where: {tag_id: 3}
        })
        
        res.status(200).json({core, legs, arms})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/user', async (req, res) => {
    try {
        const core = await Workout.count({
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id'],
                    where: {id: 1}
                }
            ],
            where: {
                user_id: req.session.user_id,
            },
        });
        const legs = await Workout.count({
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id'],
                    where: {id: 2}
                }
            ],
            where: {
                user_id: req.session.user_id,
            },
        });
        const arms = await Workout.count({
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id'],
                    where: {id: 3}
                }
            ],
            where: {
                user_id: req.session.user_id,
            },
        });

        res.status(200).json({core, legs, arms})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router