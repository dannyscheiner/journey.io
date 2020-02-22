/* eslint-disable function-paren-newline */
const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasksController');

router.get('/:date', tasksController.getTasks, (req, res) => {
  res.status(200).json(res.locals.taskList)
})

router.post('/add/:date', tasksController.addTask, tasksController.getTasks, (req, res) => {
  res.status(200).json(res.locals.taskList)
})

router.patch('/checkTask/:date', tasksController.checkTask, tasksController.getTasks, (req, res) => {
  res.status(200).json(res.locals.taskList)
})

module.exports = router;