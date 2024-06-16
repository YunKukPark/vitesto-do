class TaskService {
  getTodos() {
    return fetch('http://localhost:5173/todos').then(res => res.json());
  }
}

export default new TaskService();
