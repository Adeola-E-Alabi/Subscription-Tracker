import {Router} from 'express'
import { Add, Edit, Delete } from '../Controllers/journal.controller.js';

const journalRouter = Router();

journalRouter.post( '/:id', Add)
journalRouter.patch( '/:id', Edit)
journalRouter.delete( '/:id', Delete)

export default journalRouter