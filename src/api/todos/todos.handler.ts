import {Response, Request, NextFunction} from 'express';
import { InsertOneResult, ObjectId } from 'mongodb';
import { ZodError } from 'zod';
import {TodoWithId, Todos, Todo} from './todos.model';

export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction)  {
    try {
        const result = await Todos.find();
        const todos = await result.toArray();
        res.json(todos);
    } catch (err) {
        next(err);
    }
}

export async function createOne(req: Request<{}, InsertOneResult<Todo>, Todo>, res: Response<InsertOneResult<Todo>>, next:NextFunction) {
    try {
        const validateResult = await Todo.parse(req.body);
        const insertResult = await Todos.insertOne(validateResult);
        res.json(insertResult);
    } catch (err) {
        next(err);
    }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
    try {
        const todo = await Todos.findOne({_id: new ObjectId(req.params.id)});
        // console.log(todo);
        res.json(todo);
    } catch (err) {
        next(err);
    }
}

export async function updateOne(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
        next(err);
    }
}