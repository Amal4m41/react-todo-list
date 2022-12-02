import axios from 'axios';

class TodoApi {

    static async getTodos() {
        try {
            const res = await axios.get('http://localhost:3001/todos');
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    static async addTodo(todo) {
        try {
            const res = await axios.post('http://localhost:3001/todos', todo);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateTodoAsync(todo) {
        try {
            const res = await axios.patch('http://localhost:3001/todos/' + todo.id, todo);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteTodo({ id }) {
        try {
            const res = await axios.delete('http://localhost:3001/todos/' + id);
            return res.data;
        } catch (error) {
            throw error;
        }
    }


}

export default TodoApi;