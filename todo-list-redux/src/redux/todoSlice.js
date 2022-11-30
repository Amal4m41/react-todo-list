
// A slice is piece of code we write to store a slice/piece of data and all the thing required to update, retrieve that data.

import { createSlice } from "@reduxjs/toolkit";

const initialTodoListState = [
    { id: 1, content: 'Todo 1', isCompleted: false, },
    { id: 2, content: 'Todo 2', isCompleted: false, },
    { id: 3, content: 'Todo 3', isCompleted: false, },
];


//createSlice will create actions based on our reducer names.
const todoSlice = createSlice({
    name: 'todos',
    initialState: initialTodoListState,
    // reducers responds to actions by taking the current state and the action to return a new state.
    reducers: {
        addTodo: (state, action) => {
            //the state is the current state.
            //anytime we call addTodo action, this is the reducer that'll handle that action.
            const newTodo = {
                id: 5,
                content: action.payload,
                isCompleted: false,
            };

            state.push(newTodo);
            //after executing the reducer function, redux will take this new state and update the store.
            //And then goes to update our UI components which are subscribed to the same.
        },
        deleteTodo: (state, action) => {
            //TODO
            state = state.filter(t => t.id !== action.payload);
        }

    },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo } = todoSlice.actions;

//Will be added to the store.
export default todoSlice.reducer;
