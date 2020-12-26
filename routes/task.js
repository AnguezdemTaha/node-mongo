import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
 
import { BadRequestError } from '../utils/errors';
const router = Router();
 
router.get('/', async (req, res) => {
  const tasks = await req.context.models.Task.find();
  return res.send(tasks);
});
 
router.get('/:taskId', async (req, res) => {
  const task = await req.context.models.Task.findById(
    req.params.taskId,
  );
  return res.send(task);
});
 
router.post('/', async (req, res, next) => {
  const task = await req.context.models.Task.create({
    discription: req.body.discription,
    user: req.context.me.id,
  
  }).catch((error) => next(new BadRequestError(error)));
  
 
  return res.send(task);
});
 
router.delete('/:taskId', async (req, res) => {
  const task = await req.context.models.Task.findById(
    req.params.messageId,
  );
 
  if (task) {
    await task.remove();
  }
 
  return res.send(message);
});
 
export default router;