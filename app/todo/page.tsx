import React from 'react'
import { Todo } from '../lib/types';
import Err from '../components/error';
import TodoList from '../components/TodoList';

export function getRandomTodos(todoList: Todo[]): Todo[] {
    const threeNums = [];
    while(threeNums.length < 3) {
        let ran = (Math.floor(Math.random()*200) + 1);
        threeNums.push(todoList[ran-1]);
        todoList.splice(ran, 1);
    }
    return threeNums;
}

const ServerComponent = async () => {
  try{
    // Initial implementation of fetching todos from api endpoint and getting 3 random todos:
    /* 
    Select random 3 todos, then pass it along, (useless now that we are using a mock backend and instead saving 3 initial todos in there)
    However, will leave it here to show my process
    */
    /*
    const res = await fetch("https://jsonplaceholder.typicode.com/todos"); 
    if(!res.ok){ 
        throw new Error(`Error status: ${res.status}`);
    }
    const todos = await res.json() as Todo[]; // type assertion
    const initialTodos = getRandomTodos(todos);
    return <TodoList initialTodos={initalTodos} />
    */
    
    // New implementation after once utilizing route mock backend service to fetch data from api and populate todo items in "database"
    // Therefore, in this instance, no need to pass initial todos
    return <TodoList initialTodos={[]} />

  } catch (err) {

    return <Err error={err} />

  }
}

export default ServerComponent;