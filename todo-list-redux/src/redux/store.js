import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';


//creates a store that holds the state, combines our reducers etc.
export const store = configureStore({
    //will hold all of our reducers
    reducer: {
        todos: todoReducer,
    },
});