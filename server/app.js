import json from 'body-parser';
import cors from 'cors';
import express from 'express';
import { nanoid } from 'nanoid';

const app = express();

app.use(cors());
app.use(json());

const todos = [
    {
        id: nanoid(),
        content: 'todo 1',
        isCompleted: true,
    },
    {
        id: nanoid(),
        content: 'todo 2',
        isCompleted: false,
    },
    {
        id: nanoid(),
        content: 'todo 3',
        isCompleted: false,
    },
    {
        id: nanoid(),
        content: 'todo 4',
        isCompleted: false,
    },
    {
        id: nanoid(),
        content: 'todo 5',
        isCompleted: false,
    },
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
    const todo = { id: nanoid(), content: req.body.content, isCompleted: false };
    todos.push(todo);
    return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id == id);
    const isCompleted = Boolean(req.body.isCompleted);
    const content = req.body.content;
    if (index > -1) {
        if (isCompleted != null)
            todos[index].isCompleted = isCompleted;

        if (content != null)
            todos[index].content = content;
    }
    return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id == id);
    if (index > -1) {
        todos.splice(index, 1);
    }

    res.send(todos);
});


const PORT = 3001;
app.listen(PORT, 'localhost', console.log(`Server running on port ${PORT}`));