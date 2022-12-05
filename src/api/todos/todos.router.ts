import {Router} from 'express';
import * as TodoHandler from './todos.handler';
const router = Router();

// this one is much more prefered way
router.get('/', TodoHandler.findAll);
router.post('/', TodoHandler.createOne);
router.get('/:id', TodoHandler.findOne);
router.put('/:id', TodoHandler.updateOne);

// another way
/*
router.get<{}, Todo[]>('/', (req, res) => {
    res.json([{content: 'Master Coding', done: false}]);
});
*/

export default router;