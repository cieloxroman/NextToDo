'use client';
import { useEffect, useState } from "react";
import { Todo } from "../lib/types";
import Err from "./error";

interface InitialTodos {
    initialTodos: Todo[];
}

const TodoList: React.FC<InitialTodos> = ({ initialTodos }) => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [edit, setEdit] = useState<number | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [filter, setFilter] = useState('Show All');
    const tabs = ['Show All', 'Show Active', 'Show Completed'];
    const url = "/api"

    useEffect(() => {
        const fetchTodos = async () => {
            try{
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error("Failed to fetch todos");
                }
                const data = await response.json();
                setTodos((prevData) => [...prevData, ...data]);
            } catch (err) {
                return <Err error={err}  />
            }
        }
        fetchTodos();
    }, [])

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        const temp = title.trim();
        if(!temp){
            setError("Please include a title.");
            return;
        }
        const newTodo: Todo[] = [{
            userId: 1,
            id : Date.now(),
            title: title,
            completed: false
        }]
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
        if(!response.ok){
            alert("Failure to add todo");
            return;
        }
        const newTodos = await response.json();
        setTodos(newTodos);
        setTitle('');
        setError('');
    }

    const handleDelete = async (todoDelete: Todo) => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(todoDelete),
        })
        if(!response.ok){
            alert("failed to delete");
            return;
        }
        const newTodos = await response.json();
        setTodos(newTodos);
    }

    const toggleComplete = async (id: number) => {
        
        /*
        intial logic:
        setTodos((prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
        ))*/
        
        const updatedTodos = todos.map((todo) => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        )
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(updatedTodos)
        })
        if(!response.ok){
            alert('failed to toggle complete');
            return;
        }
        const newTodos = await response.json();
        setTodos(newTodos);
        //fetchTodos();
    }

    const handleEdit = async (e: React.FormEvent, t: Todo) => {
        e.preventDefault();
        const temp = newTitle.trim();
        if(!temp){
            setNewTitle(t.title);
        } else {
            /*
            initial logic:
            setTodos((prevTodos) => 
                prevTodos.map((t) => 
                    t === todo ? {...t, title: newTitle} : t
                )
            )*/

            const updatedTodos = todos.map((todo) => 
                todo.id === t.id ? {...todo, title: newTitle} : todo
            )

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify(updatedTodos)
            })
            if(!response.ok){
                alert('failed to toggle complete');
                return;
            }
            const newTodos = await response.json();
            setTodos(newTodos);
        }

        setEdit(null);
        setNewTitle('');
    }

    const handleFilter = () => {
        switch (filter) {
            case 'Show Active':
                return todos.filter(todo => !todo.completed);
            case 'Show Completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="inline bg-blue-200 border-blue-800 border-2 rounded-lg p-5 m-5 w-3xl">
                <h1 className="text-6xl pb-2 text-center text-blue-900">To Dos</h1>
                <div className="bg-blue-300 rounded-lg p-4">
                    <form onSubmit={addTodo}>
                        <label className="text-blue-800 text-2xl font-bold">Enter Title:</label>
                        <input 
                            className="border-2 border-gray-700 rounded-lg block p-1 w-2xl h-fit outline-none bg-blue-100"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        { error && (
                            <div 
                                className="m-1 text-red-700" 
                                role="alert"
                            >
                                <p>{error}</p>
                            </div>
                        )}
                        <button type="submit" className="bg-blue-800 rounded-lg block mt-4 p-2 text-white">Add</button>
                    </form>
                </div>
                <br />
                
                { todos.length<1 ? (
                    <h1 className="text-3xl p-2 text-center text-blue-900">No to-dos! 🙃</h1>
                ) : (
                    <>
                        <div className="text-center">
                            {tabs.map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`bg-blue-300 rounded-lg rounded-b-none m-1 mb-0 p-1 text-black ${filter == tab ? "bg-blue-500 text-white" : ""}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="bg-blue-300 rounded-lg">
                            <ul className="p-3 bg-blue-500 rounded-lg">
                                {handleFilter().map((todo) => (
                                    <li 
                                        className={`bg-blue-800 p-2 m-3 rounded-lg text-white ${todo.completed ? "complete" : ""}`}
                                        key={todo.id}>
                                        <p className="text-lg">{todo.title}</p>
                                        { edit === todo.id && (
                                            <form onSubmit={(e) => handleEdit(e, todo)}>
                                                <input 
                                                className="text-black border-2 border-gray-700 rounded-lg block p-1 w-full h-fit outline-none bg-blue-100"
                                                type="text"
                                                value={newTitle}
                                                onChange={(e) => setNewTitle(e.target.value)}
                                            />
                                                <button className="bg-blue-400 rounded-lg mt-1 p-1 text-white">Update</button>
                                            </form>
                                        )}
                                        <div className="flex justify-end">
                                            <button className="bg-blue-400 rounded-lg mt-1 mr-4 p-1 text-white" onClick={() => toggleComplete(todo.id)}>
                                                {todo.completed === true ? "Unmark" : "Mark"}                                        
                                            </button>
                                            <button className="bg-red-400 rounded-lg mr-4 mt-1 p-1 text-black" onClick={() => handleDelete(todo)}>Delete</button>
                                            <button className="bg-blue-400 rounded-lg mt-1 mr-4 p-1 text-white" onClick={() => {setEdit(todo.id); setNewTitle(todo.title)}}>Edit</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default TodoList;