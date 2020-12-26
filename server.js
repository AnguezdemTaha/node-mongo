import routes from './routes';
import 'dotenv/config';
import models, { connectDb } from './models';
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middleware for determination request sender ????  : i think enregestrate the user like session or ...
app.use(async (req, res, next) => {
  req.context = {
    models,
    //me: models.users[1],..
    me: await models.User.findByLogin('test','test'),
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/tasks', routes.task);

//not matched routes
app.get('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );
 
  error.statusCode = 301;
 
  next(error);
});
//handling errors midlwere
app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
 
  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }
  return res.status(error.statusCode).json({ error: error.toString() });
});



//re-initialize your database on every Express server start,
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
//re-initialize your database on every Express server start,
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Task.deleteMany({}),
    ]);
  }

  createUsersWithMessages();
//
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
});
const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'test',
    mail : 'test',
    password : 'test',
  });
 
  const user2 = new models.User({
    username: 'test2',
    mail : 'test2',
    password : 'test2',
  });
 
  const task1 = new models.Task({
    discription: 'Published the Road to learn React',
    user: user1.id,
  });
 
  const task2 = new models.Task({
    discription: 'Happy to release ...',
    user: user2.id,
  });
 
  const task3 = new models.Task({
    discription: 'Published a complete ...',
    user: user2.id,
  });
 
  await task1.save();
  await task2.save();
  await task3.save();
 
  await user1.save();
  await user2.save();
};