import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const getTodoAsyn = createAsyncThunk('todos/getTodoAsyn' , 
async() => {
    const response = await fetch('http://localhost:7000/todos');
    if(response.ok){
        const todos = await response.json();
        return {todos};
    }
});

export const addTodoAsync = createAsyncThunk('todo/addToDoAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/todos', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({title: payload.title})
    });

    if(response.ok){
        const todos = await response.json();
        return {todos};
    }
}
);

export const toggleCompleteAsync =  createAsyncThunk('todos/completeTodoAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({completed: payload.completed})
    });
    if(response.ok){
        const todos = await response.json();
        return {id: todos.id, completed: todos.completed};
    }
});

export const deleteToDoAsync = createAsyncThunk('todos/deleteToDoAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({id: payload.id})
    });
    if(response.ok){
        const todos = await response.json();
        return {id: payload.id};
    }
});

const todoSlice = createSlice({
    name: "todos",
    initialState:[
        {id: 1, title: "todo1", completed: false},
        {id: 2, title: "todo2", completed: false},
        {id: 3, title: "todo3", completed: true},
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            };
            state.push(newTodo);
        },
        toggleComplete: (state,action) => {
            const index = state.findIndex(
                (todo)=> todo.id === action.payload.id
                );
                state[index].completed = action.payload.completed;

        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },
        extraReducers: {
            [getTodoAsyn.pending]: (state, action) => {
                console.log("Fetching data...");
            },
            [getTodoAsyn.fulfilled]: (state,action) => {
                console.log("Fetched data successfully.");
                return action.payload.todos;
            },
            [addTodoAsync.fulfilled]: (state, action) => {
                state.unshift(action.payload.todos);
            },
            [toggleCompleteAsync.fulfilled]: (state, action) => {
                const index = state.findIndex((todo)=> todo.id === action.payload.id);
                    state[index].completed = action.payload.completed;
            },
            [deleteToDoAsync.fulfilled]: (state,action) => {
                return state.filter((todo) => todo.id !== action.payload.id);
            }
        },
});
export const { addTodo,
toggleComplete, 
deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;