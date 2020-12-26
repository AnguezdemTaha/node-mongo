import { Router } from 'express';
//import models from './../models';
const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});
 
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

router.post('/', async (req, res, next) => {
  const user = await req.context.models.User.create({
    username: req.body.username,
    //user: req.context.me.id,
  
  }).catch((error) => next(new BadRequestError(error)));
  
 
  return res.send(user);
});

router.post('/login', async (req, res, next) => {
//middleware for determination request sender ????  : i think enregestrate the user like session or ...

  console.log("two");
  req.context = {
    models,
    //me: models.users[1],
    me: await models.User.findByLogin(req.body.username,req.body.password),
  };
  next();

});
export default router;