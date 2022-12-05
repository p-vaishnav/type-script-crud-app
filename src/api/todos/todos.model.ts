import * as z from 'zod';
import {db} from '../../db';
import {WithId} from 'mongodb';

// Zod is a schema validation library
// Zod is a TypeScript-first schema declaration and validation library. I'm using the term "schema" to broadly refer to any data type,
// from a simple string to a complex nested object.

export const Todo = z.object({
    content: z.string().min(4),
    done: z.boolean().default(false)
});

// this below line created an interface
export type Todo = z.infer<typeof Todo>;
export type TodoWithId = WithId<Todo>;

export const Todos = db.collection<Todo>('todos');