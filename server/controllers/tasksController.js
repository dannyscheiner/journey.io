const db = require('../models/dataModels');
const moment = require('moment-timezone');
const getTasksQuery = "SELECT task, _id, deadline, completed, completed_date FROM tasks WHERE user_id=$1 AND deadline>=$2 ORDER BY completed, deadline"
const addTaskQuery = "INSERT INTO tasks (task, deadline, completed, user_id) VALUES ($1, $2, false, $3)";
const currentTaskStat = "SELECT completed FROM tasks WHERE _id=$1";
const checkTaskQuery = "UPDATE tasks SET completed=$1, completed_date=$2 WHERE _id=$3";
const today = moment(new Date()).tz('America/Los_Angeles').format().slice(0,10);

const tasksController = {};

tasksController.getTasks = (req, res, next) => {
  db.query(getTasksQuery, [req.cookies.toDoI, req.params.date])
    .then(taskList => {
      res.locals.taskList = taskList.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in tasksController.getTasks',
        status: 400,
        message: { err: err },
      });
    })
}

tasksController.addTask = (req, res, next) => {
  const params = [req.body.task, req.body.deadline, 1];
  db.query(addTaskQuery, params)
    .then(res => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in tasksController.addTasks',
        status: 400,
        message: { err: err },
      });
    })
}

tasksController.checkTask = async (req, res, next) => {
  try {
    const id = await db.query(currentTaskStat, [req.body.id]);
    const status = !id.rows[0].completed;
    await db.query(checkTaskQuery, [status, today, req.body.id]);
    return next();
  }
  catch(err) {
    return next({
      log: 'Error occured in tasksController.checkTasks',
      status: 400,
      message: { err: err },
    });
  }
}

module.exports = tasksController;