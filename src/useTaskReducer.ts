import { useReducer } from 'react';
import { Priority, Status, Todo } from './services/task.schema';

type Action =
  | { type: 'INIT'; payload: Array<Todo> }
  | { type: 'CHANGE_STATUS'; payload: { id: Todo['id']; status: Status } }
  | { type: 'DELETE_TODO'; payload: Todo['id'] }
  | { type: 'SORT_PRIORITY' }
  | { type: 'SORT_STATUS' }
  | { type: 'SET_TODOS'; payload: Array<Todo> }
  | { type: 'ADD_TODO'; payload: Todo };

const initialState: Array<Todo> = [];

const taskReducer = (state: Array<Todo>, action: Action): Array<Todo> => {
  switch (action.type) {
    case 'INIT':
      return action.payload;

    case 'CHANGE_STATUS':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, status: action.payload.status }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);

    case 'SORT_PRIORITY':
      const priorityOrder = {
        [Priority.High]: 1,
        [Priority.Medium]: 2,
        [Priority.Low]: 3,
      };
      return [...state].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );

    case 'SORT_STATUS':
      const statusOrder = {
        [Status.NotStarted]: 1,
        [Status.Pending]: 2,
        [Status.InProgress]: 3,
        [Status.Completed]: 4,
      };
      return [...state].sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
      );

    case 'SET_TODOS':
      return action.payload;

    case 'ADD_TODO':
      return [...state, action.payload];

    default:
      return state;
  }
};

export const useTaskReducer = () => {
  const [todos, dispatch] = useReducer(taskReducer, initialState);

  return { todos, dispatch };
};
