import {Router} from 'express'
import authorize from '../Middlewares/auth.middleware.js'
import { createSubscription, getUserSubscriptions } from '../Controllers/subscription.controller.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req,res) => res.send({title: 'get all subscriptions'}))

subscriptionRouter.get('/:id', (req,res) => res.send({title: 'get subscription details'}))

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req,res) => res.send({title: 'update subscriptions'}))

subscriptionRouter.delete('/:id', (req,res) => res.send({title: 'DELETE subscriptions'}))

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (req,res) => res.send({title: 'cancel subscriptions'}))

subscriptionRouter.get('/upcoming-renewals', (req,res) => res.send({title: 'get upcoming renewals'}))

export default subscriptionRouter