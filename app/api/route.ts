import { NextRequest, NextResponse } from "next/server";
import { Todo } from "../lib/types";
import { getRandomTodos } from "../todo/page";

// fetch todos from api endpoint, so that the prepopulated "database" has randomly 3 todos
const res = await fetch("https://jsonplaceholder.typicode.com/todos"); 
if(!res.ok){ 
    throw new Error(`Error status: ${res.status}`);
}
export const todoItems = await res.json() as Todo[]; // type assertion
const todos = getRandomTodos(todoItems);

export async function GET(request: NextRequest) {
    return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
    const newTodo = await request.json();
    todos.push(...newTodo);
    return NextResponse.json(todos);
}

export async function PUT(request: NextRequest) {
    const todo = await request.json();

    const index = todos.findIndex((t) => t.id == todo.id);
    todos[index] = todo;

    return NextResponse.json(todos);
}

export async function DELETE(request: NextRequest){
    const deleteTodo = await request.json();

    const index = todos.findIndex((todo) => todo.id == deleteTodo.id);
    todos.splice(index, 1);
    
    return NextResponse.json(todos);
}