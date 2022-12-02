
// A slice is piece of code we write to store a slice/piece of data and all the thing required to update, retrieve that data.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialTodoListState = [
//     { id: 1, content: 'Todo 1', isCompleted: false, },
//     { id: 2, content: 'Todo 2', isCompleted: false, },
//     { id: 3, content: 'Todo 3', isCompleted: false, },
// ];

//this is the new action thunk that we'll dispatch from our component, which inturn will dispatch it's own action with the 
//completed response as the action payload to the reducer.
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
    async () => {
        const res = await fetch('http://localhost:3001/todos');
        if (res.ok) {
            const todos = await res.json()
            return { todos }; //this will be the payload of the action dispatched by the thunk.
        }
    }
);

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
    //the payload is the one passed by the components when the thunk action is dispatched.
    async (payload) => {
        const res = await fetch('http://localhost:3001/todos',
            {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ content: payload })
            });
        if (res.ok) {
            const todo = await res.json()
            return { todo }; //this will be the payload of the action dispatched by the thunk.
        }
    }
);

export const updateTodoAsync = createAsyncThunk('todos/updateTodoAsync',
    async (payload) => {
        const res = await fetch('http://localhost:3001/todos/' + payload.id,
            {
                headers: { 'Content-Type': 'application/json' },
                method: "PATCH",
                body: JSON.stringify(payload)
            });
        if (res.ok) {
            const updatedTodo = await res.json()
            return { updatedTodo }; //this will be the payload of the action dispatched by the thunk.
        }
    }
);

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync',
    async (payload) => {
        const res = await fetch('http://localhost:3001/todos/' + payload.id,
            {
                method: "DELETE",
            });
        if (res.ok) {
            const todos = await res.json()
            return { todos }; //this will be the payload of the action dispatched by the thunk.
        }
    }
);

//createSlice will create actions based on our reducer names.
const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    // reducers responds to actions by taking the current state and the action to return a new state.
    reducers: {
        addTodo: (state, action) => {
            //the state is the current state.
            //anytime we call addTodo action, this is the reducer that'll handle that action.
            const newTodo = {
                id: Date.now(),
                content: action.payload,
                isCompleted: false,
            };

            state.push(newTodo);
            //after executing the reducer function, redux will take this new state and update the store.
            //And then goes to update our UI components which are subscribed to the same.
        },
        deleteTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload);
            state.splice(index, 1);
        },
        updateTodo: (state, action) => {
            const updateData = action.payload;
            const index = state.findIndex(todo => todo.id === updateData.id);
            state[index].content = updateData.content;
        },
        updateTodoCompleted: (state, action) => {
            const { id, isCompleted } = action.payload;
            const index = state.findIndex(todo => todo.id === id);
            state[index].isCompleted = isCompleted;
        }

    },
    extraReducers: {
        //when the thunk dipatches a 'fulfilled' action, i.e. the api call is completed.
        [getTodosAsync.pending]: (state, action) => {
            console.log('Loading todolist values');
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            console.log(state);
            state.push(action.payload.todo);
        },
        [updateTodoAsync.fulfilled]: (state, action) => {
            const updatedTodo = action.payload.updatedTodo;
            const index = state.findIndex(todo => todo.id === updatedTodo.id);
            state[index].content = updatedTodo.content;
            state[index].isCompleted = updatedTodo.isCompleted;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => action.payload.todos
    }
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodo, updateTodoCompleted } = todoSlice.actions;

//Will be added to the store.
export default todoSlice.reducer;
