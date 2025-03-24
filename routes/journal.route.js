import {Router} from 'express'
import { Add, Edit, Delete } from '../Controllers/journal.controller.js';

const journalRouter = Router();

journalRouter.post( '/New-Note', Add)
journalRouter.patch( '/Edit-Note', Edit)
journalRouter.delete( '/Delete-Note', Delete)

export default journalRouter