import { NextRequest, NextResponse } from "next/server";
import { Todo } from "../lib/types";
import { todoItems } from "../todo/page";

export var todos: Todo[] = todoItems;


export async function GET(request: NextRequest) {
    return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
    const newTodo = await request.json();
    todos.push(...newTodo);
    return NextResponse.json(todos);
}

export async function PUT(request: NextRequest) {
    const updatedTodo = await request.json();
    todos = updatedTodo;
    return NextResponse.json(todos);
}

export async function DELETE(request: NextRequest){
    const deleteTodo = await request.json();
    const newTodos = todos.filter((todo) => todo.id != deleteTodo.id)
    console.log(newTodos);
    todos = newTodos;

    return NextResponse.json(todos);
}