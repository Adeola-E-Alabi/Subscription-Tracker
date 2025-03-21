import {Router} from 'express'
import authorize from '../Middlewares/auth.middleware.js'
import { getUsers,getUser } from '../Controllers/User.Controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id',authorize, getUser);
userRouter.post('/', (req,res) => res.send({title: 'create new user'}));
userRouter.put('/:id', (req,res) => res.send({title: 'update all users'}));
userRouter.delete('/', (req,res) => res.send({title: 'delete a users'}));

export default userRouter