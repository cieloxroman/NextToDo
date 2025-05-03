import React from 'react'
import { Todo } from '../lib/types';
import Err from '../components/error';
import TodoList from '../components/TodoList';

export var todoItems: Todo[] = [];

const ServerComponent = async () => {
  try{
    // fetch todos from api endpoint
    const res = await fetch("https://jsonplaceholder.typicode.com/todos"); 
    if(!res.ok){ 
        throw new Error(`Error status: ${res.status}`);
    }
    const todos = await res.json() as Todo[]; // type assertion
    
    // select random 3 todos, then pass it along
    function getRandomTodos(todoList: Todo[]): Todo[] {
        const threeNums = [];
        while(threeNums.length < 3) {
            let ran = (Math.floor(Math.random()*200) + 1);
            threeNums.push(todoList[ran-1]);
            todoList.splice(ran, 1);
        }
        return threeNums;
    }
    const initialTodos = getRandomTodos(todos);
    todoItems = initialTodos;
    return <TodoList initialTodos={initialTodos} />

  } catch (err) {

    return <Err error={err} />

  }
}

export default ServerComponent;