
// A slice is piece of code we write to store a slice/piece of data and all the thing required to update, retrieve that data.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TodoApi from "../api/todoApi";


//this is the new action thunk that we'll dispatch from our component, which inturn will dispatch it's own action with the 
//completed response as the action payload to the reducer.
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
    async () => {
        const todos = await TodoApi.getTodos();
        return { todos }; //this will be the payload of the action dispatched by the thunk.
    }
);

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
    //the payload is the one passed by the components when the thunk action is dispatched.
    async (payload) => {
        const todo = await TodoApi.addTodo({ content: payload });
        return { todo };
    }
);

export const updateTodoAsync = createAsyncThunk('todos/updateTodoAsync',
    async (payload) => {
        const updatedTodo = await TodoApi.updateTodoAsync(payload);
        return { updatedTodo };
    }
);

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync',
    async (payload) => {
        const todos = await TodoApi.deleteTodo(payload);
        return { todos };
    }
);


//createSlice will create actions based on our reducer names.
const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    // reducers responds to actions by taking the current state and the action to return a new state.
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getTodosAsync.fulfilled, (state, action) => {
                return action.payload.todos;
            });

            builder.addCase(addTodoAsync.fulfilled, (state, action) => {
                state.push(action.payload.todo);
            });

            builder.addCase(updateTodoAsync.fulfilled, (state, action) => {
                const updatedTodo = action.payload.updatedTodo;
                const index = state.findIndex(todo => todo.id === updatedTodo.id);
                state[index].content = updatedTodo.content;
                state[index].isCompleted = updatedTodo.isCompleted;
            });

            builder.addCase(deleteTodoAsync.fulfilled, (state, action) => action.payload.todos);
        }

    // {
    //     //when the thunk dipatches a 'fulfilled' action, i.e. the api call is completed.
    //     [getTodosAsync.pending]: (state, action) => {
    //         console.log('Loading todolist values');
    //     },
    //     [getTodosAsync.fulfilled]: (state, action) => {
    //         return action.payload.todos;
    //     },
    //     [addTodoAsync.fulfilled]: (state, action) => {
    //         console.log(state);
    //         state.push(action.payload.todo);
    //     },
    //     [updateTodoAsync.fulfilled]: (state, action) => {
    //         const updatedTodo = action.payload.updatedTodo;
    //         const index = state.findIndex(todo => todo.id === updatedTodo.id);
    //         state[index].content = updatedTodo.content;
    //         state[index].isCompleted = updatedTodo.isCompleted;
    //     },
    //     [deleteTodoAsync.fulfilled]: (state, action) => action.payload.todos
    // }
});

//Will be added to the store.
export default todoSlice.reducer;
