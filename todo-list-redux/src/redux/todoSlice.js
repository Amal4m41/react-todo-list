
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
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodo, updateTodoCompleted } = todoSlice.actions;

//Will be added to the store.
export default todoSlice.reducer;
