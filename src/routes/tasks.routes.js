const { Router } = require('express');
const router = Router();

const { getTasks, createTask, updateTask } = require('../controllers/tasks.controller');


router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:index')
    .put(updateTask);

module.exports = router;