import { Todo } from './task.schema';

class TaskService {
  getTodos(): Promise<Todo[]> {
    return fetch('http://localhost:5173/todos').then(res => res.json());
  }

  postTodo(body: Omit<Todo, 'id'>) {
    return fetch('http://localhost:5173/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => res.json());
  }
}

export default new TaskService();
