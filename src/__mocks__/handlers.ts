import { http, HttpResponse } from 'msw';
import { Priority, Status } from '../services/task.schema';

export const handlers = [
  http.get('http://localhost:5173/todos', () => {
    return HttpResponse.json([
      {
        id: 1,
        title: 'Complete TypeScript tutorial',
        description:
          'Finish the tutorial on TypeScript basics and advanced features',
        dueDate: new Date('2024-06-20'),
        priority: Priority.High,
        status: Status.Pending,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Write unit tests',
        description: 'Write unit tests for the new features',
        dueDate: new Date('2024-06-25'),
        priority: Priority.Medium,
        status: Status.InProgress,
        createdAt: new Date('2024-06-10'),
        updatedAt: new Date('2024-06-12'),
      },
      {
        id: 3,
        title: 'Update project documentation',
        description: 'Ensure all new changes are documented',
        dueDate: new Date('2024-06-22'),
        priority: Priority.Low,
        status: Status.Pending,
        createdAt: new Date('2024-06-11'),
        updatedAt: new Date('2024-06-12'),
      },
      {
        id: 4,
        title: 'Refactor authentication module',
        description: 'Improve the code quality and performance',
        dueDate: new Date('2024-06-18'),
        priority: Priority.High,
        status: Status.Pending,
        createdAt: new Date('2024-06-09'),
        updatedAt: new Date('2024-06-11'),
      },
      {
        id: 5,
        title: 'Team meeting',
        description: 'Discuss project milestones and next steps',
        dueDate: new Date('2024-06-19'),
        priority: Priority.Medium,
        status: Status.Completed,
        createdAt: new Date('2024-06-05'),
        updatedAt: new Date('2024-06-10'),
      },
      {
        id: 6,
        title: 'Deploy to production',
        description: 'Deploy the latest changes to the production environment',
        dueDate: new Date('2024-06-17'),
        priority: Priority.High,
        status: Status.InProgress,
        createdAt: new Date('2024-06-08'),
        updatedAt: new Date('2024-06-15'),
      },
    ]);
  }),
];
