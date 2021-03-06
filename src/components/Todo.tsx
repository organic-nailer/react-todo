import React, { useState, useRef, useEffect } from "react";

type TodoProps = {
    name: string,
    completed: boolean,
    id: string,
    toggleTaskCompleted: (id: string) => void,
    deleteTask: (id: string) => void,
    editTask: (id: string, newName: string) => void
};

export function Todo(props: TodoProps) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const editFieldRef = useRef<HTMLInputElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);
    function usePrevious(value: boolean) {
        const ref = useRef<boolean>();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const wasEditing = usePrevious(isEditing);
    useEffect(() => {
        if(!wasEditing && isEditing) editFieldRef.current?.focus();
        if(wasEditing && !isEditing) editButtonRef.current?.focus();
    }, [isEditing, wasEditing]);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewName(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor="todo-0">{props.name}</label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setEditing(true)} ref={editButtonRef}>
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    )
    return (
        <li className="todo">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}
