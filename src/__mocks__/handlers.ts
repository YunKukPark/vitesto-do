import { http, HttpResponse } from 'msw';
import { Priority, Status, Todo } from '../services/task.schema';

export const handlers = [
  http.get('http://localhost:5173/todos', () => {
    return HttpResponse.json(TODO_LIST_MOCK);
  }),

  http.post('http://localhost:5173/todos', async ({ request }) => {
    const body = (await request.json()) as Todo;

    return HttpResponse.json([
      ...TODO_LIST_MOCK,
      {
        id: Math.max(...TODO_LIST_MOCK.map(todo => todo.id)) + 1,
        title: body.title,
        dueDate: new Date(),
        priority: Priority.Low,
        status: Status.NotStarted,
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);
  }),
];

const TODO_LIST_MOCK = [
  {
    id: 1,
    title: 'Complete TypeScript tutorial',
    dueDate: new Date('2024-06-20'),
    priority: Priority.High,
    status: Status.Pending,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Write unit tests',
    dueDate: new Date('2024-06-25'),
    priority: Priority.Medium,
    status: Status.InProgress,
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 3,
    title: 'Update project documentation',
    dueDate: new Date('2024-06-22'),
    priority: Priority.Low,
    status: Status.Pending,
    createdAt: new Date('2024-06-11'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 4,
    title: 'Refactor authentication module',
    dueDate: new Date('2024-06-18'),
    priority: Priority.High,
    status: Status.Pending,
    createdAt: new Date('2024-06-09'),
    updatedAt: new Date('2024-06-11'),
  },
  {
    id: 5,
    title: 'Team meeting',
    dueDate: new Date('2024-06-19'),
    priority: Priority.Medium,
    status: Status.Completed,
    createdAt: new Date('2024-06-05'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 6,
    title: 'Deploy to production',
    dueDate: new Date('2024-06-17'),
    priority: Priority.High,
    status: Status.InProgress,
    createdAt: new Date('2024-06-08'),
    updatedAt: new Date('2024-06-15'),
  },
];
