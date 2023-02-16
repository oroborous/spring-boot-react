import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {TodoTable} from "./components/TodoTable";
import {NewTodoForm} from "./components/NewTodoForm";

export const App = () => {
    const [showAddTodoForm, setShowAddTodoForm] = useState(false);

    const [todos, setTodos] = useState([
        {
            rowNumber: 1,
            rowDescription: "Feed doggos",
            rowAssigned: "User One"
        },
        {
            rowNumber: 2,
            rowDescription: "Make dinner",
            rowAssigned: "Use Two"
        },
        {
            rowNumber: 3,
            rowDescription: "Water plants",
            rowAssigned: "User One"
        },
        {
            rowNumber: 4,
            rowDescription: "Order joggers",
            rowAssigned: "User Two"
        }
    ]);

    const addToDo = (description: string, assigned: string) => {
        let rowNumber = 0;

        if (todos.length > 0) {
            rowNumber = todos[todos.length - 1].rowNumber + 1;
        } else {
            rowNumber = 1;
        }
        const newTodo = {
            rowNumber: rowNumber,
            rowDescription: description,
            rowAssigned: assigned
        };
        setTodos(todos => [...todos, newTodo]);
        console.log(todos);
    }

    const deleteTodo = (deleteTodoRowNumber: number) => {
        let filtered = todos.filter(function (value) {
            return value.rowNumber !== deleteTodoRowNumber;
        });
        setTodos(filtered);
    };

    return (
        <div className="mt-5 container">
            <div className="card">
                <div className="card-header">
                    Your Todo's
                </div>
                <div className="card-body">
                    <TodoTable todos={todos}
                               deleteTodo={deleteTodo}/>
                    <button className="btn btn-primary"
                            onClick={() => setShowAddTodoForm(!showAddTodoForm)}>
                        {showAddTodoForm ? "Close New Todo" : "New Todo"}
                    </button>
                    {showAddTodoForm &&
                        <NewTodoForm addTodo={addToDo}/>}

                </div>
            </div>
        </div>
    );
}
