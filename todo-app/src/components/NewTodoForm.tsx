import React, {useState} from "react";

export const NewTodoForm: React.FC<{
    addTodo: Function
}> = (props) => {
    const [description, setDescription] = useState("");
    const [assigned, setAssigned] = useState("");

    const submitTodo = () => {
        if (description && assigned) {
            props.addTodo(description, assigned);
            setDescription("");
            setAssigned("");
        }
    };

    return (
        <div className="mt-5">
            <form>
                <div className="mb-3">
                    <label htmlFor="assigned" className="form-label">Assigned</label>
                    <input id="assigned"
                           type="text"
                           className="form-control"
                           required
                           onChange={e => setAssigned(e.target.value)}
                           value={assigned}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description"
                              className="form-control"
                              required
                              onChange={e => setDescription(e.target.value)}
                              value={description}></textarea>
                </div>
                <button className="btn btn-primary mt-3"
                        onClick={submitTodo}>Add Todo
                </button>
            </form>
        </div>
    );
}